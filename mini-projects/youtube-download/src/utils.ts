import * as fse from 'fs-extra';
import { promisify } from 'util';
import { IYtdlInfo } from './youtube-download';
export function readStream(file: string): fse.ReadStream {
    return fse.createReadStream(file);
}

export function writeStream(file: string): fse.WriteStream {
    return fse.createWriteStream(file);
}

let _readFile = promisify(fse.readFile);
export function readFile(file: string): Promise<any> {
    return _readFile(file);
}

export function waitStreams(streams: Array<fse.ReadStream | fse.WriteStream>): Promise<void> {
    return Promise.all(streams.map(waitForStream))[0];
}

export function getFileName(info: IYtdlInfo): string {
    return info._filename 
        || ((info.fulltitle || info.title) + '.' + info.ext) 
        || 'UNKNOWN_'+Date.now()+'.'+info.ext;
}


export function waitForStream(stream: fse.ReadStream | fse.WriteStream): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        stream.on('error', err => {
            reject(err);
            stream.close();
        });
        stream.on('end', resolve);
        stream.on('close', resolve);
    });
}


export async function waitAll<T>(proms: Array<Promise<T>>): Promise<Array<T | undefined>> {
    let _resolve;
    let resProm = new Promise<Array<any>>((resolve, reject) => {
        _resolve = resolve;
    });

    let results: Array<T | undefined> = [];
    let fin = (err, res) => {
        if (err) {
            console.error(err);
        }
        results.push(res);
        if (results.length === proms.length) {
            _resolve(results);
        }
    }

    proms.forEach(p => {
        p.then(res => fin(null, res));
        p.catch(err => fin(err, undefined));
    });

    return resProm;

}
