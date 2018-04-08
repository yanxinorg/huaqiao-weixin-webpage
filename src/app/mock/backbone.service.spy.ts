import {of} from 'rxjs/observable/of';

export class BackboneServiceSpy {
    sucess = {code: 0, msg: []};        // 成功

    setAsDefaultPatientIdCard = jasmine.createSpy('setAsDefaultPatientIdCard').and.returnValue(of(this.sucess));

    validatePatientIdCard = jasmine.createSpy('validatePatientIdCard').and.returnValue(of({code: 0, cardid: 'NO:CARD-ID'}));

    unbindPatientIdCard = jasmine.createSpy('unbindPatientIdCard').and.returnValue(of(this.sucess));

    getUserReportList = jasmine.createSpy('getUserReportList').and.returnValue(of(this.sucess));

    sendVerificationCode = jasmine.createSpy('sendVerificationCode').and.returnValue(of({Code: 'FAIL'}));

    bindPatientIdCard = jasmine.createSpy('bindPatientIdCard').and.returnValue(of(this.sucess));
}
