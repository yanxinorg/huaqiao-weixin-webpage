import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewCardCheckedComponent} from './new-card-checked.component';
import {ActivatedRouteStub, RouterStub} from '../../mock/router.stub';
import {BackboneServiceSpy} from '../../mock/backbone.service.spy';
import {BackboneService} from '../../services/backbone.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {VerificationCodeComponent} from '../../widget/verification-code/verification-code.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalStub} from '../../mock/modal.stub';

describe('NewCardCheckedComponent', () => {
    let component: NewCardCheckedComponent;
    let fixture: ComponentFixture<NewCardCheckedComponent>;
    let activatedRouteStub: ActivatedRouteStub;

    beforeEach(() => {
        activatedRouteStub = new ActivatedRouteStub({
            s: '',
            name: '',
            phone: '',
            cardid: ''
        });
    });
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule
            ],
            declarations: [VerificationCodeComponent, NewCardCheckedComponent],
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
        fixture = TestBed.createComponent(NewCardCheckedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
