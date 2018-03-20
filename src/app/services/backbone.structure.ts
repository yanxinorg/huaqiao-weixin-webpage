export class SmsMessage {
    constructor(public Code: string,
                public Message: string,
                public RequestId: string,
                public BizId: string) {
    }
}
