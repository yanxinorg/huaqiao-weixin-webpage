import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ListCardComponent} from './list-card.component';
import {ActivatedRouteStub, RouterStub} from '../../mock/router.stub';
import {ActivatedRoute, Router} from '@angular/router';
import {BackboneService} from '../../services/backbone.service';
import {BackboneServiceSpy} from '../../mock/backbone.service.spy';

describe('ListCardComponent', () => {
    let component: ListCardComponent;
    let fixture: ComponentFixture<ListCardComponent>;
    let activatedRouteStub: ActivatedRouteStub;

    beforeEach(() => {
        activatedRouteStub = new ActivatedRouteStub({s: ''});
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListCardComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: ActivatedRoute, useValue: activatedRouteStub},
                {provide: Router, useClass: RouterStub},
                {provide: BackboneService, useClass: BackboneServiceSpy}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
