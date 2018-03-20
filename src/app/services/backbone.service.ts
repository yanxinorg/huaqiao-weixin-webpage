import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {UrlService} from './url.service';
import {of} from 'rxjs/observable/of';
import {SmsMessage} from './backbone.structure';

@Injectable()
export class BackboneService {

    /**
     * 构造函数
     * 依赖注入 HttpClient 服务
     * @param http
     */
    constructor(private http: HttpClient) {
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            // console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            // this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            // return of(result as T);
            return of(error as T);
        };
    }

    getSignature(source: string): Observable<any> {
        return this.http
            .get<any>(UrlService.Sign(source))
            .pipe(
                catchError(this.handleError('getSignature', {errMsg: '#getSignature#获取签名信息失败'}))
            );
    }

    /**
     * 获取用户的报告单列表
     * @param s
     * @param from      起始日期
     * @param to        截止日期
     * @returns {Observable<{errMsg: string}|any>}
     */
    getUserReportList(s: string, from: string, to: string): Observable<any> {
        return this.http
            .get<any>(UrlService.RequestListInRange('report', s, from, to))
            .pipe(
                catchError(this.handleError('getUserReportList', {errMsg: '#getUserReportList#获取报告单失败'}))
            );
    }

    /**
     * 获取报告单详情
     * @param id
     * @returns {Observable<{errMsg: string}|any>}
     */
    getSpecificReport(id: string) {
        return this.http
            .get<any>(UrlService.RequestSpecific('report', id))
            .pipe(
                catchError(this.handleError('getSpecificReport', {errMsg: '#getSpecificReport#获取报告单详情失败'}))
            );
    }

    /**
     * 获取用户信息
     * @param session
     * @returns {Observable<{errMsg: string}|any>}
     */
    getUserInfo(session: string) {
        return this.http
            .get<any>(UrlService.RequestList('user', session))
            .pipe(
                catchError(this.handleError('getUserInfo', {errMsg: '#getUserInfo#获取用户信息失败'}))
            );
    }

    /**
     * 获取用户就诊卡列表
     * @param session
     * @returns {Observable<{errMsg: string}|any>}
     */
    getCardList(session: string) {
        return this.http
            .get<any>(UrlService.RequestList('card', session))
            .pipe(
                catchError(this.handleError('getCardList', {errMsg: '#getCardList#获取用户就诊卡列表失败'}))
            );
    }

    /**
     * 发送验证码短信
     *  传入参数
     *      --  接收电话号码
     * @param phone
     * @returns {Observable<Array|any>}
     */
    sendVerificationCode(phone: string): Observable<any> {
        return this.http
            .get<any>(UrlService.SendSms(phone, 0))
            .pipe(
                catchError(this.handleError('sendVerificationCode', []))
            );
    }

    validatePatientIdCard(name: string, phone: string, session: string): Observable<any> {
        return this.http
            .post<any>(
                UrlService.Check(),
                {
                    phone: phone,
                    name: name,
                    session: session
                }
            )
            .pipe(
                catchError(this.handleError('validatePatientIdCard', {errMsg: '#validatePatientIdCard#验证过程发生错误'}))
            );
    }

    bindPatientIdCard(sms: SmsMessage, phone: string, code: string, name: string, s: string, cardid: string): Observable<any> {
        return this.http
            .post<any>(
                UrlService.Bind(),
                {
                    requestId: sms.RequestId,
                    bizId: sms.BizId,
                    phone: phone,
                    verificationCode: code,
                    name: name,
                    session: s,
                    cardid: cardid
                }
            )
            .pipe(
                catchError(this.handleError('bindPatientIdCard', {errMsg: '#bindPatientIdCard#绑定过程发生错误'}))
            );

    }

    unbindSafetyInspection(cardid: string): Observable<any> {
        return this.http
            .post<any>(
                UrlService.Safety(),
                {
                    cardid: cardid
                }
            )
            .pipe(
                catchError(this.handleError('unbindSafetyInspection', {errMsg: '#unbindSafetyInspection#解绑过程发生错误'}))
            );
    }

    unbindPatientIdCard(sms: SmsMessage, phone: string, code: string, cardid: string): Observable<any> {
        return this.http
            .post<any>(
                UrlService.Unbind(),
                {
                    requestId: sms.RequestId,
                    bizId: sms.BizId,
                    phone: phone,
                    verificationCode: code,
                    cardid: cardid
                }
            )
            .pipe(
                catchError(this.handleError('unbindSafetyInspection', {errMsg: '#unbindSafetyInspection#解绑过程发生错误'}))
            );
    }
}
