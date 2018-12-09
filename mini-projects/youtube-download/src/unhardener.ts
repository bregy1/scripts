import { Logger } from './logger';

// This class should help debugging..
export class $$_UNHARDENER_PLUS_$$ {

    public pray(): void {
        process.on('uncaughtException', this._onUncaughtException.bind(this));
        process.on('unhandledRejection', this._onUnhandletRejection.bind(this));
        process.on('exit', this._onExit.bind(this));
        process.on('SIGINT', this._onInterrupt.bind(this));
    }

    private _onInterrupt(signal: any): void {
        Logger.log(1, ' >>> INTERRUPT');
        Logger.log(1, 'exiting process signal:', signal);
        process.exit();
    }

    private _onUncaughtException(err: Error): void {
        Logger.error(2, 'Unhandlet exception detected..');
        this._logErrorTrace(err);
    }

   private  _onUnhandletRejection(err: any): void {
       Logger.error(2, 'Unhandled Rejection detected..');
       this._logErrorTrace(err);
   }

    private _onExit(code: number): void {
        Logger.log(1, 'Program exited with code ', code);
        if(code === 0) {
            return;
        }
        Logger.log(1, `## Detected a non null [${code}] errorcode. Got it ? :)`);
    }

    private _logErrorTrace(err: any): void {
        if(err && err.stack) {
            Logger.error(2, err.stack);
        }
    }

    public constructor() {
        //
    }
}