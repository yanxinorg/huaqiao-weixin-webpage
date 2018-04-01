import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UnbindCardComponent} from './unbind-card.component';
import {ActivatedRouteStub, RouterStub} from '../../mock/router.stub';
import {FormsModule} from '@angular/forms';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalStub} from '../../mock/modal.stub';
import {BackboneService} from '../../services/backbone.service';
import {BackboneServiceSpy} from '../../mock/backbone.service.spy';

describe('UnbindCardComponent', () => {
    let component: UnbindCardComponent;
    let fixture: ComponentFixture<UnbindCardComponent>;
    let activatedRouteStub: ActivatedRouteStub;

    beforeEach(() => {
        activatedRouteStub = new ActivatedRouteStub({
            s: '',
            phone: '',
            cardid: ''
        });
        activatedRouteStub.setResolver({removeCardResolver: {}});
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
                {provide: Router, useClass: RouterStub},
                {provide: NgbModal, useClass: NgbModalStub},
                {provide: BackboneService, useClass: BackboneServiceSpy}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UnbindCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
