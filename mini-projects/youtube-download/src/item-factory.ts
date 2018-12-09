import { IItem } from './queue/item-queue';
import { YoutubeItem } from './strategies/youtube-item'; 
import { EmptyItem } from './strategies/empty-item';

export class ItemFactory {

    static getItem(url: string, destFolder: string): IItem {
        console.log('building item with:', destFolder);
        if(url.indexOf('youtube') > -1) {
            return new YoutubeItem(url, destFolder); 
        }

        return new EmptyItem();
        
    }
}