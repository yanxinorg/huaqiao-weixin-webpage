import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ListReportComponent} from './list-report.component';
import {ActivatedRouteStub} from '../../mock/router.stub';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackboneService} from '../../services/backbone.service';
import {BackboneServiceSpy} from '../../mock/backbone.service.spy';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {click} from '../../mock/helper';
import {By} from '@angular/platform-browser';
import {LocalStorageService} from '../../services/local.storage.service';

describe('ListReportComponent', () => {
    let component: ListReportComponent;
    let fixture: ComponentFixture<ListReportComponent>;
    let activatedRouteStub: ActivatedRouteStub;
    let page: Page;
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    beforeEach(() => {
        activatedRouteStub = new ActivatedRouteStub({
            s: 'TEST-SESSION',
            n: '',
            g: ''
        });
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                NgbModule.forRoot()
            ],
            declarations: [ListReportComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: ActivatedRoute, useValue: activatedRouteStub},
                {provide: Router, useValue: routerSpy},
                {provide: LocalStorageService, useClass: LocalStorageService},
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
