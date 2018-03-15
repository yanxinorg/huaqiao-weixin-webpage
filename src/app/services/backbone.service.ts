import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {UrlService} from './url.service';
import {of} from 'rxjs/observable/of';

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

    getUserReportList(s: string, from: string, to: string): Observable<any> {
        return this.http
            .get<any>(UrlService.RequestListInRange('report', s, from, to))
            .pipe(
                catchError(this.handleError('getUserReportList', {errMsg: '#getUserReportList#获取报告单失败'}))
            );
    }
}
