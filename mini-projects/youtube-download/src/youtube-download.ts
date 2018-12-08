
import { get } from 'lodash';
var ytdl = require('youtube-dl');
import { promisify }from 'util';

export class Ytdl {

    private videoInfo: IYtdlInfo;
    constructor(private rawUrl: string) {

    }

    public async requestFreshInfo(): Promise<IYtdlInfo> {
        let info = await promisify(ytdl.getInfo)(this.rawUrl);
        this.videoInfo = this._buildInfo(info);
        return this.videoInfo;
        
    }

    public async getInfo(): Promise<IYtdlInfo> {

        if(!this.videoInfo) {
            await this.requestFreshInfo();
        }

        return this.videoInfo;
    }

    public _buildInfo(info: Object): IYtdlInfo {
    
        return {
            thumbnail: get(info, 'thumbnail', ''),
            description: get(info, 'description', ''),
            id:get(info, 'id', ''),
            title: get(info, 'title', ''),
            fulltitle: get(info, 'fulltitle', ''),
            duration: get(info, 'duration', 0),
            _filename: get(info, '_filename', ''),
            artist: get(info, 'artist', ''),
            ext: get(info, 'ext', ''),
            filesize: get(info, 'filesize', 0),
            track: get(info, 'track', ''),
    
            // this is video url
            url: get(info, 'url', '')
        }
    }

}

export interface IYtdlInfo {
    thumbnail?: string;
    description?: string;
    id?:string;
    title?: string;
    fulltitle: string;
    duration?: number;
    _filename?: string;
    artist?: string;
    ext: string;
    filesize?: number;
    track?: string;

    // this is video url
    url: string;
    
}

