import { Item } from '../strategies/item';
import { ItemQueue } from './item-queue';
import { YoutubeItem } from '../strategies/youtube-item';
import { EmptyItem } from '../strategies/empty-item';

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

    let type1 = 'download';
    let type2 = 'request';

    let itemQueue = new ItemQueue();
    itemQueue.register('download', 2);
    itemQueue.register('request', 1);

    // 2 jobs. One finished
    let item = new EmptyItem();
    item.addJob('download', wait(5));
    // item.addJob(type1, wait(2));
    //item.addJob(type1, wait(2));
    //item.addJob(type2, wait(2));
    // item.addJob(type2, wait(2));
    // item.addJob(type2, wait(2));

    let item2 = new EmptyItem();
    item2.addJob('download', wait(5));
    // item2.addJob(type1, wait(2));
    // item.addJob(type1, wait(2));
    // item.addJob(type2, wait(2));
    // item.addJob(type2, wait(2));
    // item.addJob(type2, wait(2));

    let item3 = new EmptyItem();
    item3.addJob('download', wait(5));
    //item3.addJob(type1, wait(2));
    //item3.addJob(type1, wait(2));
    //  item3.addJob(type2, wait(2));
    //  item3.addJob(type2, wait(2));
    // item3.addJob(type2, wait(2));

    let item4 = new EmptyItem();
    item4.addJob('download', wait(5));
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