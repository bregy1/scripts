import { ICmd } from '../node-cmd/node-cmd.interface';

export abstract class ICommands {
    public abstract listProcesses(): Promise<string>;
    public abstract killProcesses(ids: Array<number | string>):  Promise<string>;
    public abstract toPids(pids: string[]): string[];
    protected async runCommand(command: string, args: Array<string | number> = []): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            if(args.length) {
                command = `${command} ${args.join('\s')}`;
            }
            console.log('################################################');
            console.log('################################################');
            
            console.log('running command::', command);
            this.cmd.get(command, (err, data, stdErr) => {
                console.log('command ' + command + 'runned\noutput:');
                console.log('err:',err,'\n', 'data:', data, '\n', 'stdErr:', stdErr, command );
                if(err) {
                    return reject(err);
                }
                resolve(data);
            });
        });
    }

    constructor(private cmd: ICmd) {

    }

}
