import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailReportComponent} from './detail-report.component';
import {ActivatedRouteStub, RouterSpy} from '../../mock/router.stub';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../../services/local.storage.service';

describe('DetailReportComponent', () => {
    let component: DetailReportComponent;
    let fixture: ComponentFixture<DetailReportComponent>;
    let activatedRouteStub: ActivatedRouteStub;

    beforeEach(() => {
        activatedRouteStub = new ActivatedRouteStub({
            name: '',
            gender: '',
            title: '',
            create_time: '',
            sample: ''
        });
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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
