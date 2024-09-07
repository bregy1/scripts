import { readFile } from './utils';
import { Parser } from './parser';
import { ItemQueue } from './queue/item-queue';
import { $$_UNHARDENER_PLUS_$$ } from './unhardener';
import { ItemFactory } from './item-factory';
import { Logger } from './logger';

// pray..()
new $$_UNHARDENER_PLUS_$$().pray();

Logger.setVerbosity(10)

async function doFullQueue(inputFile: string, destFolder: string) {

    // first we parse urls out of source data..
    let rawInputData = await readFile(inputFile);
    let urls = new Parser().urls(rawInputData.toString());
    console.log('trying to download following urls:', urls);
    
    // now we create items corresponding to urls for downloading items
    let items = urls.map(url => ItemFactory.getItem(url, destFolder));

    let itemQueue = new ItemQueue();
    itemQueue.register('download', 1);
   // itemQueue.register('request', 1);

    console.log('processing item,s now');
    let processedItems = await Promise.all(items.map(item => itemQueue.processItem(item)));
    console.log('items processed.');

}


let source = '/Users/silvanbregy/Documents/Github/scripts/mini-projects/youtube-download/src/urls.txt';
let destFolder = '/Users/silvanbregy/Documents/Github/scripts/mini-projects/youtube-download/src/downloads';

doFullQueue(source, destFolder).then(res => console.log("program done.", res)).catch(console.error);