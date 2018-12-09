import { IItem, IJob } from './item-queue';
import { createId } from './utils';
import * as _ from 'lodash';

export interface IJob {
    type: string;
    job: (args?: any[]) => Promise<void>;
    args?: any[];
    done: boolean;
    id: string;
    error?: any;
}

export class Item implements IItem {

    private _jobs: IJob[] = [];
    private _id: string;

    public constructor(id?: string) {
        this._id = id || createId();
    }

    public addJob(type: string, job: (args?: any[]) => Promise<void>, args?: any[]) {
        this._jobs.push({
            type: type,
            job: job,
            done: false,
            id: createId(),
            args: args
        });
    }

    public hasNext(): boolean {
        return this._jobs.some(job => !job.done);
    }

    public next(): IJob {
        return this._jobs.find(job => !job.done);
    }

    public done(error: any, id: string): void {
        let index = this._jobs.findIndex(job => job.id === id);
        if (index === -1) {
            return console.error('JOB with id', id, 'NOT FOUND..');
        }
        _.assign(this._jobs[index], { error: error, done: true });
    }
}