import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListReportComponent} from './list-report.component';
import {ActivatedRouteStub, RouterSpy} from '../../mock/router.stub';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackboneService} from '../../services/backbone.service';
import {BackboneServiceSpy} from '../../mock/backbone.service.spy';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

describe('ListReportComponent', () => {
    let component: ListReportComponent;
    let fixture: ComponentFixture<ListReportComponent>;
    let activatedRouteStub: ActivatedRouteStub;

    beforeEach(() => {
        activatedRouteStub = new ActivatedRouteStub({
            s: '',
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
                {provide: Router, useClass: RouterSpy},
                {provide: BackboneService, useClass: BackboneServiceSpy}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListReportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
