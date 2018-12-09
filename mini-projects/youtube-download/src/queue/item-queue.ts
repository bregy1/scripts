import { WorkerQueue } from './worker-queue';
import { JobTypes } from '../strategies/item';

export interface IJob {
    type: JobTypes;
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

    private _workerPools: { [key in JobTypes]?: WorkerQueue } = {};

    public processItem(item: IItem): Promise<IItem> {
        // let index = this._items.push(item);
        return this._processItem(item);
    }

    public register(type: JobTypes, workers: number): void {
        if (this._workerPools[type]) {
            throw 'Queue ' + type + ' already registered';
        }
        this._workerPools[type] = new WorkerQueue(workers, -1, true);
    }

    private async _processItem(item: IItem): Promise<IItem> {
        while (item.hasNext()) {
            let job = item.next();
            let queue: WorkerQueue = this._workerPools[job.type];
            if (!queue) {
                console.log('QUEUE ' + queue + ' NOT REGISTERED')
                throw 'QUEUE ' + queue + ' NOT REGISTERED';
            }
            let jobLabel = job.type+'_'+job.id;
            try {
                console.time(jobLabel)
                await queue.run(job.job, job.args);
                console.timeEnd(jobLabel);
            } catch (error) {
                console.timeEnd(jobLabel);
                job.error = error;
            }
            
            item.done(job.error, job.id);
        }

        return item;
    }
}
