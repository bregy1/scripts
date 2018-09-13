import { ICommands } from '../command/commands';
import { WindowsCommands } from '../command/windows-commands';

export class ProcessSecuritas {

    private commands: ICommands;

    public async clear(badGuys: Array<string | RegExp>): Promise<string> {

        var badProcesses = (await this.commands.listProcesses()).split('\n')
            .filter(activePr => badGuys.some(badGuy => this.isBadGuy(activePr, badGuy)));    
        
        return this.commands.killProcesses(this.commands.toPids(badProcesses));

    }

    private isBadGuy(target: string, match: string | RegExp, fullMatch: boolean = false): boolean {
        if(typeof match === 'string') {
            if(fullMatch) {
                return match === target;
            }
            return target.indexOf(match) > -1;
        }
        return match.test(target);
    }

    constructor(os: 'windows') {
         if(os === 'windows') {
             this.commands = new WindowsCommands();
         }
    }
}