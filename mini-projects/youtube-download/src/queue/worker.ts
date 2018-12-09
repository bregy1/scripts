
export interface IMember {
    id: string;
    fn: Function;
    args?: any[];
    onDone: Function;
}

export class Worker {

    private _isActive: boolean = false;
    private _wantBeRunning: boolean = false;

    public constructor(private _members: IMember[], run: boolean = false) {
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

    // trying next without changing active set of queue like resume.
    // use with caution..
    public async _tryNext() {
        if(!this._isActive) {
            this._isActive = true;
            this._next();
        }
    }
}
