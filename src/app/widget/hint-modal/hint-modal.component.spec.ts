import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HintModalComponent} from './hint-modal.component';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbActiveModalStub} from '../../mock/modal.stub';

describe('HintModalComponent', () => {
    let component: HintModalComponent;
    let fixture: ComponentFixture<HintModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HintModalComponent],
            providers: [
                {provide: NgbActiveModal, useClass: NgbActiveModalStub}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HintModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
