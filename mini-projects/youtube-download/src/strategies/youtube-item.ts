
import { get } from 'lodash';
var ytdl = require('youtube-dl');
var youtubedl = require('youtube-dl');

import { promisify } from 'util';
import { createWriteStream } from 'fs';
import { waitStreams } from '../utils';
import { Item, ISimpleJob } from './item';
import { join } from 'path';
import { Logger } from '../logger';

export class YoutubeItem extends Item {

    private videoInfo: IYtdlInfo;

    constructor(private rawUrl: string, destFolder: string) {
        super();

        let jobs: ISimpleJob[] = [
            // {
            //    type: 'request',
            //    job: this.requestFreshInfo.bind(this),
            // },
            {
                type: 'download',
                job: this.downloadVideo.bind(this),
                args: [destFolder]
             },
        ];

        jobs.forEach(j => this.addJob(j.type, j.job, j.args));
    }

    public async requestFreshInfo(): Promise<IYtdlInfo> {
        let info = await promisify(ytdl.getInfo)(this.rawUrl);
        this.videoInfo = this._buildInfo(info);
        return this.videoInfo;
    }

    public async getInfo(): Promise<IYtdlInfo> {

        if (!this.videoInfo) {
            await this.requestFreshInfo();
        }

        return this.videoInfo;
    }

    get downloadUrl(): string {
        if (this.videoInfo) {
            return this.videoInfo.url;
        }
        return this.rawUrl;
    }

    public async downloadVideo(destFolder: string): Promise<void> {
        let destFile = join(destFolder, this.videoInfo.trackName);
        Logger.info(3, 'Download video. \nDestfolder:', destFolder, '\nTrackname:', this.videoInfo.trackName)
        var video = youtubedl(this.downloadUrl);
        let destStream = createWriteStream(destFile);
        video.pipe(destStream);

        // Will be called when the download starts.
        /*video.on('info', function(info) {
          console.log('Download started');
          console.log('size: ',info);
        });*/

        return waitStreams([video, destStream])
    }

    private _getTrackName(info: Object): string {
        let _info = info || {};   
        return (_info['track'] || _info['title'] || _info['fulltitle']) +
            (_info['ext'] ? '.' + info['ext'] : '') ||
            (_info['_filename'] || 'UNKWNOWN_FILE'+Date.now()+'.'+_info['ext']);
    }

    private _buildInfo(info: Object): IYtdlInfo {

        return {
            trackName: this._getTrackName(info),
            thumbnail: get(info, 'thumbnail', ''),
            description: get(info, 'description', ''),
            id: get(info, 'id', ''),
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
    id?: string;
    title?: string;
    fulltitle: string;
    duration?: number;
    _filename?: string;
    artist?: string;
    ext: string;
    filesize?: number;
    track?: string;
    trackName: string;
    // this is video url
    url: string;
}





