const PROTOCOL = 'https://';
// const PROTOCOL = 'http://';
const HOST = 'www.thinmelon.cc';
// const HOST = 'localhost:4200';
const API = '/authorization';
const PREFIX = PROTOCOL + HOST + API;

export class UrlService {
    static Sign(source: string): string {
        return PREFIX + '/sign?source=' + source;
    }

    static RequestList(name: string, session: string): string {
        return `${ PREFIX }/table/${ name }?session=${ session }`;
    }

    static RequestListInRange(name: string, session: string, from: string, to: string): string {
        return `${ PREFIX }/table/${ name }/${ from }-${ to }?session=${ session }`;
    }
}
