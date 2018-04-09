import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {TransferStationComponent} from './transfer-station.component';
import {ActivatedRouteStub, RouterSpy} from '../mock/router.stub';
import {LocalStorageService} from '../services/local.storage.service';

describe('TransferStationComponent', () => {
    let component: TransferStationComponent;
    let fixture: ComponentFixture<TransferStationComponent>;
    let activatedRouteStub: ActivatedRouteStub;
    let page: Page;

    beforeEach(() => {
        activatedRouteStub = new ActivatedRouteStub({
            MrS: '************************',
            name: 'TEST-PATH',
            n: 'TEST-NAME',
            g: '1'
        });
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TransferStationComponent],
            providers: [
                {provide: ActivatedRoute, useValue: activatedRouteStub},
                {provide: Router, useClass: RouterSpy},
                {provide: LocalStorageService, useClass: LocalStorageService},
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TransferStationComponent);
        component = fixture.componentInstance;
        page = new Page(fixture);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('应路由至首页【 当未找到相应路径时 】', () => {
        fixture.detectChanges();
        expect(page.navigateSpy).toHaveBeenCalled();
        expect(page.navigateSpy).toHaveBeenCalledWith(['/']);
    });

    it('应路由至新增就诊卡页面【 当参数为/card/new时 】', () => {
        activatedRouteStub.setParamMap({
            MrS: '************************',
            name: 'NewCard'
        });
        fixture.detectChanges();
        expect(page.navigateSpy.calls.count()).toEqual(2, '路由功能被调用两次');
        expect(page.navigateSpy.calls.mostRecent().args[0][0]).toEqual('/card/new', '应路由至新增就诊卡页面');
    });

    it('应路由至报告单列表页面【 当参数为/report/list时 】', () => {
        activatedRouteStub.setParamMap({
            MrS: '************************',
            name: 'ReportList'
        });
        fixture.detectChanges();
        expect(page.navigateSpy.calls.mostRecent().args[0][0]).toEqual('/report/list', '应路由至报告单列表页面');
    });

    it('应路由至用户详情页面【 当参数为/user/detail时 】', () => {
        activatedRouteStub.setParamMap({
            MrS: '************************',
            name: 'UserDetail'
        });
        fixture.detectChanges();
        expect(page.navigateSpy.calls.mostRecent().args[0][0]).toEqual('/user/detail', '应路由至用户详情页面');
    });
});

/////////// Helpers /////

class Page {
    fixture: ComponentFixture<TransferStationComponent>;
    navigateSpy: jasmine.Spy;

    constructor(fixture: ComponentFixture<TransferStationComponent>) {
        this.fixture = fixture;

        // get the navigate spy from the injected router spy object
        const routerSpy = <any> fixture.debugElement.injector.get(Router);
        this.navigateSpy = routerSpy.navigate;
    }
}
