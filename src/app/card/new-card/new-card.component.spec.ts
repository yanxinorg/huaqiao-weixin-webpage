import {async, ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {NewCardComponent} from './new-card.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterSpy} from '../../mock/router.stub';
import {Router} from '@angular/router';
import {BackboneService} from '../../services/backbone.service';
import {BackboneServiceSpy} from '../../mock/backbone.service.spy';
import {click} from '../../mock/helper';
import {LocalStorageService} from '../../services/local.storage.service';

describe('NewCardComponent', () => {
    ////// Testing Vars //////
    let component: NewCardComponent;
    let fixture: ComponentFixture<NewCardComponent>;
    let localStorage: LocalStorageService;
    let page: Page;

    beforeEach(() => {
        localStorage = new LocalStorageService();
        localStorage.set('MrS', 'TEST-SESSION');

    });
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [NewCardComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: Router, useClass: RouterSpy},
                {provide: LocalStorageService, useValue: localStorage}
            ]
        })
            .overrideComponent(NewCardComponent, {
                set: {
                    providers: [
                        {provide: BackboneService, useClass: BackboneServiceSpy}
                    ]
                }
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewCardComponent);
        component = fixture.componentInstance;
        page = new Page(fixture);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // it('应提示重新登录【 未正确登录 】', () => {
    //     expect(page.alert).not.toBeNull('如果session未定义，应显示提示信息');
    //     expect(page.alert.textContent).toBe('请重新登录', '显示"请重新登录"的提示信息');
    // });

    it('应启动绑定就诊卡的流程【 点击 新增就诊卡 】', fakeAsync(() => {
        click(page.submit);
        expect(page.navigateSpy).toHaveBeenCalled();
        expect(page.navigateSpy).toHaveBeenCalledWith(['/card/check']);
    }));
});

/////////// Helpers /////

class Page {
    fixture: ComponentFixture<NewCardComponent>;
    navigateSpy: jasmine.Spy;

    constructor(fixture: ComponentFixture<NewCardComponent>) {
        this.fixture = fixture;

        // get the navigate spy from the injected router spy object
        const routerSpy = <any> fixture.debugElement.injector.get(Router);
        this.navigateSpy = routerSpy.navigate;
    }

    get submit() {
        return this.query<HTMLButtonElement>('button');
    }

    get inputs() {
        return this.queryAll<HTMLInputElement>('input');
    }

    get nameInput() {
        return this.inputs[0];
    }

    get phoneInput() {
        return this.inputs[1];
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
