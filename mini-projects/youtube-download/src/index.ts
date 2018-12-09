import { Ytdl, IYtdlInfo } from './youtube-download';
import { readFile, waitAll } from './utils';
import { Parser } from './parser';
import { join } from 'path';

async function doFullQueue(inputFile: string, destFolder: string) {

    // first we parse urls out of source data..
    let rawInputData = await readFile(inputFile);
    let urls = new Parser().urls(rawInputData.toString());

    // then we wanna collect infos for these sources.
    let downloads = urls.map(url => new Ytdl(url));
    let infos = await waitAll(downloads.map(download => download.getInfo()))

    // then we download all collected infos
    let downLodResults = await waitAll(infos.map(async (info, index) => {
        if(!info) return Promise.resolve('INVALID INFO>>');
        console.log('fineLname:', info.trackName);
        return downloads[index].downloadVideo(join(destFolder, info.trackName));
    }));

    console.log("done!");
    console.log(downLodResults);
    //  in the end we do cleanup operations or do file move etc..

}

let source = '/Users/silvanbregy/Documents/Github/scripts/mini-projects/youtube-download/src/urls.txt';
let destFolder = '/Users/silvanbregy/Documents/Github/scripts/mini-projects/youtube-download/src/downloads';

doFullQueue(source, destFolder).then(res => console.log("program done.", res)).catch(console.error);