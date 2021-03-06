import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailReportSnapshotComponent} from './detail-report-snapshot.component';
import {LocalStorageService} from '../../services/local.storage.service';

describe('DetailReportSnapshotComponent', () => {
    let component: DetailReportSnapshotComponent;
    let fixture: ComponentFixture<DetailReportSnapshotComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DetailReportSnapshotComponent],
            providers: [
                {provide: LocalStorageService, useClass: LocalStorageService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailReportSnapshotComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
