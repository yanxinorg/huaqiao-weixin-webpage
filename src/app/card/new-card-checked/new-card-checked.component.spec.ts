import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {NewCardCheckedComponent} from './new-card-checked.component';
import {RouterSpy} from '../../mock/router.stub';
import {BackboneServiceSpy} from '../../mock/backbone.service.spy';
import {BackboneService} from '../../services/backbone.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {VerificationCodeComponent} from '../../widget/verification-code/verification-code.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalStub} from '../../mock/modal.stub';
import {click} from '../../mock/helper';
import {LocalStorageService} from '../../services/local.storage.service';

describe('NewCardCheckedComponent', () => {
    let component: NewCardCheckedComponent;
    let fixture: ComponentFixture<NewCardCheckedComponent>;
    // let activatedRouteStub: ActivatedRouteStub;
    let page: Page;

    beforeEach(() => {
        // activatedRouteStub = new ActivatedRouteStub({
        //     s: '',
        //     name: '',
        //     phone: '',
        //     cardid: ''
        // });
    });
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [VerificationCodeComponent, NewCardCheckedComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                // {provide: ActivatedRoute, useValue: activatedRouteStub},
                {provide: Router, useClass: RouterSpy},
                {provide: NgbModal, useClass: NgbModalStub},
                {provide: LocalStorageService, useClass: LocalStorageService},
                {provide: BackboneService, useClass: BackboneServiceSpy}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewCardCheckedComponent);
        component = fixture.componentInstance;
        page = new Page(fixture);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('点击发送按键后应提示错误信息【 当未输入手机号码 】', fakeAsync(() => {
        click(page.sendButton);
        tick();

        fixture.detectChanges();
        expect(page.alert.textContent).toEqual('请输入正确的手机号码');
    }));

    it('点击下一步应触发绑定流程', fakeAsync(() => {
        click(page.confirmButton);
        tick();

        fixture.detectChanges();
        expect(page.alert.textContent).toEqual('验证码输入有误！');

        component.verificationSms = {Code: '', Message: '', RequestId: '', BizId: ''};
        click(page.confirmButton);
        tick();

        fixture.detectChanges();
        expect(page.alert).toBeNull('应不再显示错误提示框');
    }));

});

class Page {
    fixture: ComponentFixture<NewCardCheckedComponent>;
    navigateSpy: jasmine.Spy;

    constructor(fixture: ComponentFixture<NewCardCheckedComponent>) {
        this.fixture = fixture;

        // get the navigate spy from the injected router spy object
        const routerSpy = <any> fixture.debugElement.injector.get(Router);
        this.navigateSpy = routerSpy.navigate;
    }

    get buttons() {
        return this.queryAll<HTMLButtonElement>('button');
    }

    get sendButton() {
        return this.buttons[0];
    }

    get confirmButton() {
        return this.buttons[1];
    }

    get alert() {
        return this.query<HTMLElement>('ngb-alert');
    }

    //// query helpers ////
    private query<T>(selector: string): T {
        return this.fixture.nativeElement.querySelector(selector);
    }

    private queryAll<T>(selector: string): T[] {
        return this.fixture.nativeElement.querySelectorAll(selector);
    }
}
