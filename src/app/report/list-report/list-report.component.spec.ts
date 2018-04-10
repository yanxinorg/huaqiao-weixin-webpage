import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ListReportComponent} from './list-report.component';
import {RouterSpy} from '../../mock/router.stub';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {Router} from '@angular/router';
import {BackboneService} from '../../services/backbone.service';
import {BackboneServiceSpy} from '../../mock/backbone.service.spy';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {click} from '../../mock/helper';
import {By} from '@angular/platform-browser';
import {LocalStorageService} from '../../services/local.storage.service';

describe('ListReportComponent', () => {
    let component: ListReportComponent;
    let fixture: ComponentFixture<ListReportComponent>;
    let localStorage: LocalStorageService;
    let page: Page;

    beforeEach(() => {
        this.localStorage = new LocalStorageService();
        this.localStorage.set('MrS', 'TEST-SESSION');
        this.localStorage.set('n', 'TEST-NAME');
        this.localStorage.set('g', '1');
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbModule.forRoot()
            ],
            declarations: [ListReportComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: Router, useClass: RouterSpy},
                {provide: LocalStorageService, useValue: this.localStorage},
                {provide: BackboneService, useClass: BackboneServiceSpy}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListReportComponent);
        component = fixture.componentInstance;
        page = new Page(fixture);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('应显示暂无记录【 查询我的报告单结果为空时 】', fakeAsync(() => {
        click(page.button);
        tick();
        fixture.detectChanges();
        expect(page.noRecordDisplay.nativeElement.textContent.trim()).toEqual('暂无记录');
    }));

    it('应跳转至报告单详情页【 点击列表项 】', () => {
        // TODO: 点击查询后，生成模拟数据。不为空。
    });
});

/////////// Helpers /////

class Page {
    fixture: ComponentFixture<ListReportComponent>;
    navigateSpy: jasmine.Spy;

    constructor(fixture: ComponentFixture<ListReportComponent>) {
        this.fixture = fixture;

        // get the navigate spy from the injected router spy object
        const routerSpy = <any> fixture.debugElement.injector.get(Router);
        this.navigateSpy = routerSpy.navigate;
    }

    get button() {
        return this.fixture.debugElement.query(By.css('#btn-query'));
    }

    get noRecordDisplay() {
        return this.fixture.debugElement.query(By.css('.no-record'));
    }
}
