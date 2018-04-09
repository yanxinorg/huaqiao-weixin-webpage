import {Component, OnInit} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import {BackboneService} from '../../services/backbone.service';
import {LocalStorageService} from '../../services/local.storage.service';
import {ReportDetail} from '../../services/backbone.structure';

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

    constructor(private router: Router,
                private localStorage: LocalStorageService,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        // 默认查询取值过去7天的this记录
        const fd = moment().subtract(7, 'days');
        const td = moment();
        this.fromDate = {year: fd.get('year'), month: fd.get('month') + 1, day: fd.get('date')};
        this.toDate = {year: td.get('year'), month: td.get('month') + 1, day: td.get('date')};
        this.MrS = this.localStorage.get('MrS');
        this.patientName = this.localStorage.get('n');
        this.patientSex = +this.localStorage.get('g');
    }

    /**
     * 查询
     */
    findMyReport() {
        if (this.MrS && this.check()) {
            this.backbone.getUserReportList(this.MrS,
                encodeURIComponent(`${ this.fromDate.year }/${ this.fromDate.month }/${ this.fromDate.day }`),
                encodeURIComponent(`${ this.toDate.year }/${ this.toDate.month }/${ this.toDate.day }`))
                .subscribe(data => {
                    /**
                     *  未绑定就诊卡 或者 未设置默认就诊卡
                     */
                    if (data.hasOwnProperty('code') && data.code === -400) {
                        this.errorMessage = '登录超时或未设置默认就诊卡';
                        this.isEmpty = true;
                        this.reports = [];
                    } else {
                        /**
                         *  判断报告单是否空
                         */
                        if (data.msg.length === 0) {
                            this.isEmpty = true;
                            this.reports = [];
                        } else {
                            this.isEmpty = false;
                            this.reports = data.msg.map((item) => {
                                item.create_time = moment(item.create_time).format('YYYY-M-D,hh:mm:ss');
                                return item;
                            });
                        }
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

    /**
     * 跳转至报告单详情
     * @param id
     * @param title
     * @param sample
     * @param createTime
     */
    toReportDetail(id: number, title: string, sample: string, createTime: string) {
        this.localStorage.set('MrS', this.MrS);
        this.localStorage.setObject('Report', new ReportDetail(
            id, this.patientName, this.patientSex, title, createTime, sample
        ));
        this.router.navigate(['/report/detail']);
        // this.router.navigate(['/report/detail', {
        //     rid: id,
        //     name: this.patientName,
        //     gender: this.patientSex,
        //     title: title,
        //     sample: sample,
        //     create_time: createTime
        // }]).then();
    }
}
