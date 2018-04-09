import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../services/local.storage.service';

@Component({
    selector: 'app-transfer-station',
    templateUrl: './transfer-station.component.html',
    styleUrls: ['./transfer-station.component.css']
})
export class TransferStationComponent implements OnInit {

    constructor(private route: ActivatedRoute,
                private router: Router,
                private localStorage: LocalStorageService) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.localStorage.set('MrS', params.get('MrS'));
            switch (params.get('name')) {
                case 'NewCard':
                    this.router.navigate(['/card/new']);
                    break;
                case 'ReportList':
                    this.localStorage.set('n', params.get('n'));
                    this.localStorage.set('g', params.get('g'));
                    this.router.navigate(['/report/list']);
                    break;
                case 'UserDetail':
                    this.router.navigate(['/user/detail']);
                    break;
                default:
                    this.router.navigate(['/']);
                    break;
            }
        });
    }
}
