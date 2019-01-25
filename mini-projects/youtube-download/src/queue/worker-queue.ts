import { createId } from '../utils';
import { IMember, Worker } from './worker';

export class WorkerQueue {

    public static ERR_QUEUE_FULL = 'ERR_QUEUE_FULL';

    private _members: IMember[] = [];
    private _workers: Worker[] = [];
  
    public constructor(workerCount: number, private _maxSize: number = -1, run: boolean = true) {
        console.log('creating WorkerQueue with ['+ workerCount+'] workers');
        for(let i = 0; i < workerCount; i++) {
            this._workers.push(new Worker(this._members, run));
        }
    }

    public pause() {
        this._workers.forEach(w => w.pause());
    }

    public resume() {
        this._workers.forEach(w => w.resume());
    }

    private _tryNext() {
        this._workers.forEach(w => w._tryNext());
    }

    public async run<T>(fn: (...args: any[]) => Promise<T> | T, args?: any[]): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this._add(fn, args || [], (error, result) => {       
                if (error) {
                    return reject(error);
                } 
                resolve(result);
            });
            
             // make sure queue restarts if stopped after adding it...
            this.resume();
        });
    }

    private _add<T>(fn: (...args: any[]) => Promise<T> | T, args: any[], onDone: (error: any, result: T) => void): void {
        if (this._maxSize > -1 && this._members.length > this._maxSize) {
            return onDone(WorkerQueue.ERR_QUEUE_FULL, null);
        }
        let id = createId();
        this._members.push({ fn, id, args, onDone });
        this._tryNext();
    }
}
