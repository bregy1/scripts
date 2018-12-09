import { Ytdl, IYtdlInfo } from './youtube-download';
import { readFile, waitAll } from './utils';
import { Parser } from './parser';
import { join } from 'path';
import { ItemQueue } from './item-queue';
import { Item } from './item';
import { $$_UNHARDENER_PLUS_$$ } from './unhardener';

// pray..()
new $$_UNHARDENER_PLUS_$$().pray();

async function doFullQueue(inputFile: string, destFolder: string) {

    // first we parse urls out of source data..
    let rawInputData = await readFile(inputFile);
    let urls = new Parser().urls(rawInputData.toString());

    // then we wanna collect infos for these sources.
    let downloads = urls.map(url => new Ytdl(url));
    let infos = await waitAll(downloads.map(download => download.getInfo()))

    // then we download all collected infos
    let downLodResults = await waitAll(infos.map(async (info, index) => {
        if (!info) return Promise.resolve('INVALID INFO>>');
        console.log('fineLname:', info.trackName);
        return downloads[index].downloadVideo(join(destFolder, info.trackName));
    }));

    console.log("done!");
    console.log(downLodResults);
    //  in the end we do cleanup operations or do file move etc..

}
function wait(seconds: number): () => Promise<void> {
    return waitMs(seconds * 1000);
}

function waitMs(timeMs: number): () => Promise<void> {
    return function () {
        return new Promise<void>((resolve, reject) => {
            setTimeout(resolve, timeMs);
        });
    }
}

async function testQueue(): Promise<void> {
    let items: Item[] = [];

    let type1 = 'downloads';
    let type2 = 'requests';

    let itemQueue = new ItemQueue();
    itemQueue.register(type1, 2);
    itemQueue.register(type2, 1);

    // 2 jobs. One finished
    let item = new Item();
    item.addJob(type1, wait(5));
    // item.addJob(type1, wait(2));
    //item.addJob(type1, wait(2));
    //item.addJob(type2, wait(2));
    // item.addJob(type2, wait(2));
    // item.addJob(type2, wait(2));

    let item2 = new Item();
    item2.addJob(type1, wait(5));
    // item2.addJob(type1, wait(2));
    // item.addJob(type1, wait(2));
    // item.addJob(type2, wait(2));
    // item.addJob(type2, wait(2));
    // item.addJob(type2, wait(2));

    let item3 = new Item();
    item3.addJob(type1, wait(5));
    //item3.addJob(type1, wait(2));
    //item3.addJob(type1, wait(2));
    //  item3.addJob(type2, wait(2));
    //  item3.addJob(type2, wait(2));
    // item3.addJob(type2, wait(2));

    let item4 = new Item();
    item4.addJob(type1, wait(5));
    //item4.addJob(type1, wait(2));
    //item4.addJob(type1, wait(2));
    //  item4.addJob(type2, wait(2));
    //  item4.addJob(type2, wait(2));
    // item4.addJob(type2, wait(2));

    items.push(item);

    console.log('lets Process round 1');
    await Promise.all([
        itemQueue.processItem(item),
        itemQueue.processItem(item2),
        itemQueue.processItem(item3),
    ]);

    console.log('Process round 1 done.');
    await new Promise<void>((resolve, reject) => {
        setTimeout(resolve, 1000);
    });

    console.log("ROUND 2 now!");
    await itemQueue.processItem(item4);

    //  return items;
}

async function tryRealQueue(inputFile: string, destFolder: string) {

    // first we parse urls out of source data..
    let rawInputData = await readFile(inputFile);
    let urls = new Parser().urls(rawInputData.toString());

    let queue = new ItemQueue();
    queue.register('sdf', 4)

    // then we wanna collect infos for these sources.
    let downloads = urls.map(url => new Ytdl(url));
    let infos = await waitAll(downloads.map(download => download.getInfo()))

    // then we download all collected infos
    let downLodResults = await waitAll(infos.map(async (info, index) => {
        if (!info) return Promise.resolve('INVALID INFO>>');
        console.log('fineLname:', info.trackName);
        return downloads[index].downloadVideo(join(destFolder, info.trackName));
    }));

    console.log("done!");
    console.log(downLodResults);
    //  in the end we do cleanup operations or do file move etc..

}
/*let source = '/Users/silvanbregy/Documents/Github/scripts/mini-projects/youtube-download/src/urls.txt';
let destFolder = '/Users/silvanbregy/Documents/Github/scripts/mini-projects/youtube-download/src/downloads';

doFullQueue(source, destFolder).then(res => console.log("program done.", res)).catch(console.error);

*/

testQueue();