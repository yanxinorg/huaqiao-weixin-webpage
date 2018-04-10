import {Component, OnInit} from '@angular/core';
import * as html2canvas from 'html2canvas';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../../services/local.storage.service';
import {ReportDetail} from '../../services/backbone.structure';

@Component({
    selector: 'app-detail-report',
    templateUrl: './detail-report.component.html',
    styleUrls: ['./detail-report.component.css']
})
export class DetailReportComponent implements OnInit {
    // patientHeadImage = '../../../assets/icons/report/head-image.png';
    // patientName = '';
    // patientGender = '';
    // patientAge = '';
    // reportTitle = '';
    // reportDatetime = '';
    // reportSampleType = '';
    reportDetail: ReportDetail;
    inspections: any[];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private localStorage: LocalStorageService) {
    }

    ngOnInit() {
        // this.route.paramMap.subscribe(params => {
        //     this.patientName = params.get('name');
        //     this.patientGender = params.get('gender');
        //     this.reportTitle = params.get('title');
        //     this.reportDatetime = params.get('create_time');
        //     this.reportSampleType = params.get('sample');
        // });
        this.reportDetail = this.localStorage.getObject('Report');
        this.route.data
            .subscribe((data: { reportInspectionResolver: any }) => {
                this.inspections = data.reportInspectionResolver;
            });
    }

    saveReportToAlbum() {
        const that = this;

        html2canvas(window.document.getElementById('report-detail'), {
            useCORS: true               // 【重要】开启跨域配置
        }).then(function (canvas) {
            /**
             *  PC 端处理方式
             */
            // saveImageInPC(canvas.toDataURL('image/png'), '');
            /**
             *  微信上处理方式
             */
            // that.router.navigate(['/report/snapshot', {snapshot: canvas.toDataURL('image/png')}]).then();
            that.localStorage.set('snapshot', canvas.toDataURL('image/png'));
            that.router.navigate(['/report/snapshot']);
        });
    }
}

/**
 * PC端
 * 在本地进行文件保存
 * @param data          要保存到本地的图片数据
 * @param filename      文件名
 */
// function saveImageInPC(data: string, filename: string) {
//     // 生成一个a元素
//     const a = document.createElement('a');
//     // 创建一个单击事件
//     const event = new MouseEvent('click');
//     // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘我的报告单’作为默认名称
//     a.download = filename || '我的报告单';
//     // 将生成的URL设置为a.href属性
//     a.href = data;
//     // 触发a的单击事件
//     a.dispatchEvent(event);
// }
