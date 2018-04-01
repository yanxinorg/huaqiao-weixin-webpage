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
    /**
     * Subject that emits the most recent item it has observed and all subsequent observed items to each subscribed Observer.
     */
        // private _repo = BehaviorSubject.create('initialize');
    private _repo = new BehaviorSubject(
        {}
    );
    readonly data = this._repo.asObservable();

    constructor(initialParams?: Params) {
        this.setParamMap(initialParams);
    }

    /** Set the paramMap observables's next value */
    setParamMap(params?: Params) {
        this.subject.next(convertToParamMap(params));
    }

    /** Set the resolver */
    setResolver(data?: any) {
        this._repo.next(data);
    }
}
