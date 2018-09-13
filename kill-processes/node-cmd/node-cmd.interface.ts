export interface ICmd {
    get: (command: string, cb: (err, data, stdErr) => void) => void;
    run?: (command: string) => void
}