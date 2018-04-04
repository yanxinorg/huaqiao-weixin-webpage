import {of} from 'rxjs/observable/of';

export class BackboneServiceSpy {
    sucess = {code: 0};        // 成功

    setAsDefaultPatientIdCard = jasmine.createSpy('setAsDefaultPatientIdCard').and.returnValue(of(this.sucess));

    validatePatientIdCard = jasmine.createSpy('validatePatientIdCard').and.returnValue(of(this.sucess));

    unbindPatientIdCard = jasmine.createSpy('unbindPatientIdCard').and.returnValue(of(this.sucess));
}
