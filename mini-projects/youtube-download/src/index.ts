import { Ytdl } from './youtube-download';

var url = 'https://www.youtube.com/watch?v=Dc5JaMw3b-8';
let yt = new Ytdl(url);

yt.getInfo().then(info => {
    console.log(info)
})