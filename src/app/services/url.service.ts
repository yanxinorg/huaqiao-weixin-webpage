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

    static RequestSpecific(name: string, id: string): string {
        return `${ PREFIX }/table/${ name }/id/${ id }`;
    }

    static RequestList(name: string, session: string): string {
        return `${ PREFIX }/table/${ name }?session=${ session }`;
    }

    static RequestListInRange(name: string, session: string, from: string, to: string): string {
        return `${ PREFIX }/table/${ name }/${ from }-${ to }?session=${ session }`;
    }

    static SendSms(phone: string, type: number): string {
        return `${ PROTOCOL }${ HOST }/backbone/sms/${ phone }/type/${ type }`;
    }

    static Check(): string {
        return `${ PREFIX }/check`;
    }

    static Bind(): string {
        return `${ PREFIX }/bind`;
    }

    static Safety(): string {
        return `${ PREFIX }/safety`;
    }

    static Unbind(): string {
        return `${ PREFIX }/unbind`;
    }

    static Default(name: string): string {
        return `${ PREFIX }/default/${ name }`;
    }
}
