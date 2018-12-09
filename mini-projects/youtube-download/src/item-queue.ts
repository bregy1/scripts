import { WorkerQueue } from './worker-queue';

export interface IJob {
    type: string;
    job: (args?: any[]) => Promise<void>;
    args?: any[];
    done: boolean;
    id: string;
    error?: any;
}

export interface IItem {
    hasNext: () => boolean;
    next: () => IJob;
    done: (error: any, id: string) => void;
}


// allows processing items parallel. 
// jobs are limited in a way where the type of the job
// decides the queue where it is taken,
// allows things like " always allow simple get requests but do only allow 3 downloads a time:))"
export class ItemQueue {

  //  private _items: IItem[] = [];
    private _workerPools: { [key: string]: WorkerQueue };

    public async processItem(item: IItem): Promise<IItem> {
       // let index = this._items.push(item);
        return await this._processItem(item); 
    }

    public registerQueue(type: string, workers: number): void {
        if(this._workerPools[type]) {
            throw 'Queue ' + type + ' already registered';
        }
        this._workerPools[type] = new WorkerQueue(workers, -1, true);
    }

    private async _processItem(item: IItem): Promise<IItem> {
        while(item.hasNext()) {
            let job = item.next();
            let queue: WorkerQueue = this._workerPools[job.type];
            if(!queue) {
                throw 'QUEUE ' + queue + ' NOT REGISTERED'; 
            } 
            try {
                // run actually waits for the result..
                await queue.run(job.job, job.args);
            } catch(error) {
                job.error = error;
            }
            item.done(job.error, job.id);
        }
        
        return item;
    }
}
