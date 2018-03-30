import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VerificationCodeComponent} from './verification-code.component';
import {BackboneServiceSpy} from '../../mock/backbone.service.spy';
import {BackboneService} from '../../services/backbone.service';

describe('VerificationCodeComponent', () => {
    let component: VerificationCodeComponent;
    let fixture: ComponentFixture<VerificationCodeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VerificationCodeComponent],
            providers: [
                {provide: BackboneService, useClass: BackboneServiceSpy}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VerificationCodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
