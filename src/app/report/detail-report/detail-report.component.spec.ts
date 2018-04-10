import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {By} from '@angular/platform-browser';
import {DetailReportComponent} from './detail-report.component';
import {ActivatedRouteStub, RouterSpy} from '../../mock/router.stub';
import {LocalStorageService} from '../../services/local.storage.service';
import {click} from '../../mock/helper';

describe('DetailReportComponent', () => {
    let component: DetailReportComponent;
    let fixture: ComponentFixture<DetailReportComponent>;
    let activatedRouteStub: ActivatedRouteStub;
    let page: Page;

    beforeEach(() => {
        activatedRouteStub = new ActivatedRouteStub({
            name: '',
            gender: '',
            title: '',
            create_time: '',
            sample: ''
        });
        activatedRouteStub.setResolver({reportInspectionResolver: []});
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DetailReportComponent],
            providers: [
                {provide: ActivatedRoute, useValue: activatedRouteStub},
                {provide: Router, useClass: RouterSpy},
                {provide: LocalStorageService, useClass: LocalStorageService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailReportComponent);
        component = fixture.componentInstance;
        page = new Page(fixture);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('保存至相册', () => {
        click(page.button);
        fixture.detectChanges();

        expect(page.navigateSpy).toHaveBeenCalled();
    });
});

/////////// Helpers /////

class Page {
    fixture: ComponentFixture<DetailReportComponent>;
    navigateSpy: jasmine.Spy;

    constructor(fixture: ComponentFixture<DetailReportComponent>) {
        this.fixture = fixture;

        // get the navigate spy from the injected router spy object
        const routerSpy = <any> fixture.debugElement.injector.get(Router);
        this.navigateSpy = routerSpy.navigate;
    }

    get button() {
        return this.fixture.debugElement.query(By.css('button'));
    }
}
