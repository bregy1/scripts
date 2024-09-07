import { IItem } from './queue/item-queue';
import { YoutubeItem } from './strategies/youtube-item'; 
import { EmptyItem } from './strategies/empty-item';
import { Logger } from './logger';

export class ItemFactory {

    static getItem(url: string, destFolder: string): IItem {
        Logger.log(1, 'building item with:', url);
        if(url.indexOf('youtube') > -1) {
            return new YoutubeItem(url, destFolder); 
        }

        return new EmptyItem();
        
    }
}