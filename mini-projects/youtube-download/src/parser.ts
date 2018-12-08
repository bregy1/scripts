
import { compact, isArray} from 'lodash';
export class Parser {

    private urlRegex: RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

    public urls(data: string[]): string[] {
        return this._parse(data, this.urlRegex);
    }

    private _parse(data: string[] | string, regex: RegExp): string[] {
        if(!isArray(data)) {
            data = data.split('\n');
        }
        let matches: string[] = [];
        data.forEach(d => {
            matches.push(...compact(d.match(regex)));
        });
        return matches;
    }
}