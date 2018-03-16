import {Component, OnInit} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {BackboneService} from '../../services/backbone.service';

@Component({
    selector: 'app-list-report',
    templateUrl: './list-report.component.html',
    styleUrls: ['./list-report.component.css']
})
export class ListReportComponent implements OnInit {
    fromDate: NgbDateStruct;
    toDate: NgbDateStruct;
    MrS: string;
    patientName: string;
    patientSex: number;
    errorMessage = '';
    reports: any[];
    isEmpty = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        this.MrS = this.route.snapshot.paramMap.get('s');
        this.patientName = this.route.snapshot.paramMap.get('n');
        this.patientSex = +this.route.snapshot.paramMap.get('g');
        // 默认查询取值过去7天的记录
        const fd = moment().subtract(7, 'days');
        const td = moment();
        this.fromDate = {year: fd.get('year'), month: fd.get('month') + 1, day: fd.get('date')};
        this.toDate = {year: td.get('year'), month: td.get('month') + 1, day: td.get('date')};
    }

    /**
     * 查询
     */
    findMyReport() {
        if (this.check() && this.MrS) {
            this.backbone.getUserReportList(this.MrS,
                encodeURIComponent(`${ this.fromDate.year }/${ this.fromDate.month }/${ this.fromDate.day }`),
                encodeURIComponent(`${ this.toDate.year }/${ this.toDate.month }/${ this.toDate.day }`))
                .subscribe(data => {
                    if (data.length === 0) {
                        this.isEmpty = true;
                        this.reports = [];
                    } else {
                        this.isEmpty = false;
                        this.reports = data.map((item) => {
                            item.create_time = moment(item.create_time).format('YYYY-M-D, h:mm:ss a');
                            return item;
                        });
                    }
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

    toReportDetail(id: number, title: string, sample: string, createTime: string) {
        this.router.navigate(['/report/detail', {
            rid: id,
            name: this.patientName,
            gender: this.patientSex,
            title: title,
            sample: sample,
            create_time: createTime
        }]).then();
    }
}
