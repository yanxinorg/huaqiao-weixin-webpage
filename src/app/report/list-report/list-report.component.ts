import {Component, OnInit} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {BackboneService} from '../../services/backbone.service';

// const now = new Date();

@Component({
    selector: 'app-list-report',
    templateUrl: './list-report.component.html',
    styleUrls: ['./list-report.component.css']
})
export class ListReportComponent implements OnInit {
    fromDate: NgbDateStruct;
    toDate: NgbDateStruct;
    MrS: string;
    errorMessage = '';
    reports: any[];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        this.MrS = this.route.snapshot.paramMap.get('s');
        console.log(this.MrS);

    }

    // selectToday() {
    //     this.toDate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    // }

    /**
     * 查询
     */
    findMyReport() {
        if (this.check() && this.MrS) {
            this.backbone.getUserReportList(this.MrS,
                encodeURIComponent(`${ this.fromDate.year }/${ this.fromDate.month }/${ this.fromDate.day }`),
                encodeURIComponent(`${ this.toDate.year }/${ this.toDate.month }/${ this.toDate.day }`))
                .subscribe(data => {
                    this.reports = data.map((item) => {
                        item.create_time = moment(item.create_item).format('YYYY-M-D, h:mm:ss a');
                        return item;
                    });
                });
        }
    }

    /**
     * 校验
     * @returns {boolean}
     */
    check() {
        if (!this.fromDate) {
            this.errorMessage = '请选择起始日期';
        } else if (!this.toDate) {
            this.errorMessage = '请选择截止日期';
        } else {
            const fd = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day);
            const td = new Date(this.toDate.year, this.toDate.month, this.toDate.day);
            if (fd > td) {
                this.errorMessage = '起始日期不能晚于截止日期';
            } else {
                this.errorMessage = '';
                return true;
            }
        }
        return false;
    }

    toReportDetail(id: number) {
        this.router.navigate(['/report/detail', {rid: id}]).then();
    }
}
