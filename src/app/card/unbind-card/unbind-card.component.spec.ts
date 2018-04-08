import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {UnbindCardComponent} from './unbind-card.component';
import {ActivatedRouteStub, RouterSpy} from '../../mock/router.stub';
import {FormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalStub} from '../../mock/modal.stub';
import {BackboneService} from '../../services/backbone.service';
import {BackboneServiceSpy} from '../../mock/backbone.service.spy';
import {click} from '../../mock/helper';
import {LocalStorageService} from '../../services/local.storage.service';

describe('UnbindCardComponent', () => {
    let component: UnbindCardComponent;
    let fixture: ComponentFixture<UnbindCardComponent>;
    let activatedRouteStub: ActivatedRouteStub;
    let page: Page;
    const verificationSms = {
        Message: 'OK',
        RequestId: 'BC511054-D97B-4F01-BB0C-FE251DFF85F2',
        BizId: '241302421377167754^0',
        Code: 'OK'
    };
    beforeEach(() => {
        activatedRouteStub = new ActivatedRouteStub({
            s: '',
            phone: '',
            cardid: ''
        });
        activatedRouteStub.setResolver({removeCardResolver: verificationSms});
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [UnbindCardComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: ActivatedRoute, useValue: activatedRouteStub},
                {provide: Router, useClass: RouterSpy},
                {provide: NgbModal, useClass: NgbModalStub},
                {provide: LocalStorageService, useClass: LocalStorageService},
                {provide: BackboneService, useClass: BackboneServiceSpy}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UnbindCardComponent);
        component = fixture.componentInstance;
        page = new Page(fixture);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('点击解绑应触发解绑流程', fakeAsync(() => {
        click(page.submit);
        tick();

        fixture.detectChanges();
        expect(page.alert).toBeNull('应不再显示错误提示框');
    }));
});

/////////// Helpers /////

class Page {
    fixture: ComponentFixture<UnbindCardComponent>;

    constructor(fixture: ComponentFixture<UnbindCardComponent>) {
        this.fixture = fixture;
    }

    get submit() {
        return this.query<HTMLButtonElement>('button');
    }

    get alert() {
        return this.query<HTMLButtonElement>('ngb-alert');
    }

    //// query helpers ////
    private query<T>(selector: string): T {
        return this.fixture.nativeElement.querySelector(selector);
    }
}
