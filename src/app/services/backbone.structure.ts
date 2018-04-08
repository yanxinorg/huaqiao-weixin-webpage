export class SmsMessage {
    constructor(public Code: string,
                public Message: string,
                public RequestId: string,
                public BizId: string) {
    }
}

export class ReportDetail {
    constructor(public rid: number,
                public name: string,
                public gender: number,
                public title: string,
                public create_time: string,
                public sample: string) {
    }
}
