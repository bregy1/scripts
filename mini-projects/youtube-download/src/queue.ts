import { createId } from './utils';
import { Logger } from './logger';

interface IMember {
    id: string;
    fn: Function;
    args?: any[];
    onDone: Function;
}

export class Queue {

    public static ERR_QUEUE_FULL = 'ERR_QUEUE_FULL';
    private _members: IMember[] = [];

    private _isActive: boolean = false;
    private _wantBeRunning: boolean = false;

    public constructor(private _maxSize: number, run: boolean = false) {
        if(run) {
            this.resume();
        }
    }

    public pause() {
        this._wantBeRunning = false;
    }

    public resume() {
        this._wantBeRunning = true;
        this._tryNext();
    }

    /*public remove(id: string): void {
        let index = this._members.findIndex(m => m.id === id);
        if(index > -1) {
            this._members.splice(index, 1);
        }
    }*/

    private async _next() {

        if(!this._wantBeRunning || this._members.length === 0) {
            this._isActive = false;
            return;
        } 
        
        let error, result;
        let member = this._members.splice(0,1)[0];
        
        try {
            result = await this._nextThrowErrors(member);
        } catch(err) {
            error = err;
        }
        member.onDone(error, result);
        
        this._next();
    }

    private async _nextThrowErrors(member): Promise<any> {
        let rawResult = member.fn(...member.args);
        if(!rawResult) {
            return;
        }

        let result;
        if(typeof rawResult.then === 'function') {
            result = await rawResult;
        }

        return result || rawResult;
            
    }

    private async _tryNext() {
        if(!this._isActive) {
            this._isActive = true;
            this._next();
        }
    }

    public async run<T>(fn: (...args: any[]) => Promise<T> | T , args?: any[]): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this._add(fn, args, (error, result) => {
                if(error) {
                    reject(error);
                } else resolve(result);
            });
        });
    }

    private _add<T>(fn: (...args: any[]) => Promise<T> | T , args: any[], onDone: (error: any, result: T) => void): void {
        if(this._maxSize > -1 && this._members.length > this._maxSize) {
            return onDone(Queue.ERR_QUEUE_FULL, null);
        }
        let id = createId();
        this._members.push({ fn, id, args, onDone });
        this._tryNext();
    }
}
