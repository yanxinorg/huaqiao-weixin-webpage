import {Component, OnInit} from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

// const now = new Date();

@Component({
    selector: 'app-list-report',
    templateUrl: './list-report.component.html',
    styleUrls: ['./list-report.component.css']
})
export class ListReportComponent implements OnInit {
    fromDate: NgbDateStruct;
    toDate: NgbDateStruct;
    // date: { year: number, month: number };

    constructor() {
    }

    ngOnInit() {
    }

    // selectToday() {
    //     this.toDate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    // }

    onDateChange(date: NgbDateStruct) {
        console.log(this.fromDate);
        console.log(this.toDate);
        if (this.fromDate && this.toDate) {
            const fd = new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day);
            const td = new Date(this.toDate.year, this.toDate.month, this.toDate.day);
            if (fd > td) {
                console.log('截止日期小于起始日期');
            } else {
                console.log('截止日期大于起始日期');
            }
        }
    }
}
