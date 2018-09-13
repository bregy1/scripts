import { ICommands } from './commands';
import { NodeCmd } from '../node-cmd/cmd';

export class WindowsCommands extends ICommands  {
    listProcesses(): Promise<string> {
        return this.runCommand('tasklist | sort');
    }
    killProcesses (ids: (string | number)[]): Promise<string>  {
        return this.runCommand('taskkill /PID', ids);
    }

    toPids(processes: string[]): string[] {
        return processes
            .map(process => process
            .replace(/\s\s+/, '\s').split(/\s/)[1]);
    }

    constructor() {
        super(new NodeCmd());
    }

}