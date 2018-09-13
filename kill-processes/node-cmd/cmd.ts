
import * as cmd from 'node-cmd';
import { ICmd } from './node-cmd.interface';

export class NodeCmd implements ICmd {
    public get(command: string, callback: (err, data, stdErr) => void): void {
        return cmd.get(command, callback);
    }

    public run(command: string): void {
        return cmd.run(command);
    }
}