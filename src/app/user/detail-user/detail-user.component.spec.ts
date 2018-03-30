import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailUserComponent} from './detail-user.component';
import {ActivatedRouteStub} from '../../mock/router.stub';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

describe('DetailUserComponent', () => {
    let component: DetailUserComponent;
    let fixture: ComponentFixture<DetailUserComponent>;
    let activatedRouteStub: ActivatedRouteStub;

    beforeEach(() => {
        activatedRouteStub = new ActivatedRouteStub({
            s: ''
        });
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DetailUserComponent],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {provide: ActivatedRoute, useValue: activatedRouteStub}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
