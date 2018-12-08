
import { compact } from 'lodash';
import * as urlModule from 'url';
// extract urls !
var testData = [
    '<a href="https://youtube.com/acd/sdfe/a.txt?id=asdfwefjn32"></a><a href="https://youtube.com?id=asdfwefjn32"></a>',
    // '<a href="https://youtube.com?id=asdfwefjn32"></a>'
]

interface IUrlObj {
    url: string;
    query: string;
}
let urls: string[] = [];
var urlRegex: RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

testData.forEach(d => {
    urls.push(...compact(d.match(urlRegex)));
});


urls.map(u => {
    let parsedUrl = urlModule.parse(u);
   // console.log('parsed: m', parsedUrl);
    let urlObj: IUrlObj = {
        query: parsedUrl.query || '',
        url: (parsedUrl.hostname || '') + (parsedUrl.pathname || '')
    };
    return urlObj;
}).forEach(console.log);