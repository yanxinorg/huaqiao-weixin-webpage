import {Component, OnInit} from '@angular/core';
// import {ActivatedRoute} from '@angular/router';
import {LocalStorageService} from '../../services/local.storage.service';

@Component({
    selector: 'app-detail-report-snapshot',
    templateUrl: './detail-report-snapshot.component.html',
    styleUrls: ['./detail-report-snapshot.component.css']
})
export class DetailReportSnapshotComponent implements OnInit {
    snapshot: string;

    constructor(// private route: ActivatedRoute,
                private localStorage: LocalStorageService) {
    }

    ngOnInit() {
        // this.snapshot = this.route.snapshot.paramMap.get('snapshot');
        this.snapshot = this.localStorage.get('snapshot');
    }
}
