import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {convertToParamMap, ParamMap, Params} from '@angular/router';

export class RouterStub {
}

export class ActivatedRouteStub {
    /** Use a ReplaySubject to share previous values with subscribers
     and pump new values into the `paramMap` observable  */
    private subject = new ReplaySubject<ParamMap>();
    /** The mock paramMap observable */
    readonly paramMap = this.subject.asObservable();
    private _repo = new BehaviorSubject(
        {
            cardListResolver: [],
            removeCardResolver: {},
            reportInspectionResolver: [],
            userInfoResolver: []
        }
    );
    public data = this._repo.asObservable();

    constructor(initialParams?: Params) {
        this.setParamMap(initialParams);
    }

    /** Set the paramMap observables's next value */
    setParamMap(params?: Params) {
        this.subject.next(convertToParamMap(params));
    }
}
