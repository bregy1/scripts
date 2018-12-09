import { Queue } from './queue';

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

export class JobQueue {

  //  private _items: IItem[] = [];
    private _queues: { [key: string]: Queue };

    public async processItem(item: IItem): Promise<IItem> {
       // let index = this._items.push(item);
        return await this._processItem(item); 

    }

    public registerQueue(type: string): void {
        this._queues[type] = new Queue(3, true);
    }

    private async _processItem(item: IItem): Promise<IItem> {
        while(item.hasNext()) {
            let job = item.next();
            let queue = this._queues[job.type];
            if(!queue) {
                throw 'QUEUE ' + queue + ' NOT REGISTERED'; 
            } 
            try {
                await queue.run(job.job, job.args);
            } catch(error) {
                job.error = error;
            }
            item.done(job.error, job.id);
        }
        return item;
    }


    // item gets added
    // item is started immediately.
    // It runs jobs of an item accoroding to queue.
    // event is emitterd when item is done





}