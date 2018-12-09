import { IItem, IJob } from '../queue/item-queue';
import { createId } from '../utils';
import * as _ from 'lodash';

export type JobTypes = 'download' | 'request';


export interface IJob extends ISimpleJob {
    done: boolean;
    id: string;
    error?: any;
}

export interface ISimpleJob {
    type: JobTypes;
    job: (args?: any[]) => Promise<void>; 
    args?: any[];
}

export abstract class Item implements IItem {

    private _jobs: IJob[] = [];

    public constructor() {
        
    }

    private _buildJob(type: JobTypes, job: (args?: any[]) => Promise<void>, args?: any[]): IJob {
        return {
            type: type,
            job: job,
            done: false,
            id: createId(),
            args: args
        };
    }

    public addJob(type: JobTypes, job: (args?: any[]) => Promise<void>, args?: any[]): void {
        this._jobs.push(this._buildJob(type, job, args));
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