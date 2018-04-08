import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {VerificationCodeComponent} from './verification-code.component';
import {BackboneServiceSpy} from '../../mock/backbone.service.spy';
import {BackboneService} from '../../services/backbone.service';
import {click} from '../../mock/helper';

describe('VerificationCodeComponent', () => {
    let component: VerificationCodeComponent;
    let fixture: ComponentFixture<VerificationCodeComponent>;
    let page: Page;

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
        page = new Page(fixture);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('发送验证码', fakeAsync(() => {
        click(page.button);
        tick();

        component.phone = '13911111111';
        fixture.detectChanges();
        click(page.button);
        tick();
    }));
});

/////////// Helpers /////

class Page {
    fixture: ComponentFixture<VerificationCodeComponent>;

    constructor(fixture: ComponentFixture<VerificationCodeComponent>) {
        this.fixture = fixture;
    }

    get button() {
        return this.fixture.debugElement.query(By.css('button'));
    }
}
