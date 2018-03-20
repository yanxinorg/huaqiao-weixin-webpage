import {Component, OnInit} from '@angular/core';
import * as html2canvas from 'html2canvas';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../../services/local.storage.service';

@Component({
    selector: 'app-detail-report',
    templateUrl: './detail-report.component.html',
    styleUrls: ['./detail-report.component.css']
})
export class DetailReportComponent implements OnInit {
    patientHeadImage = '../../../assets/icons/report/head-image.png';
    patientName = '';
    patientGender = '';
    patientAge = '';
    reportTitle = '';
    reportDatetime = '';
    reportSampleType = '';
    inspections: any[];

    constructor(private route: ActivatedRoute,
                private router: Router,
                private localStorage: LocalStorageService) {
    }

    ngOnInit() {
        this.patientName = this.route.snapshot.paramMap.get('name');
        this.patientGender = this.route.snapshot.paramMap.get('gender');
        this.reportTitle = this.route.snapshot.paramMap.get('title');
        this.reportDatetime = this.route.snapshot.paramMap.get('create_time');
        this.reportSampleType = this.route.snapshot.paramMap.get('sample');
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
            that.router.navigate(['/report/snapshot']).then();
        });
    }
}

/**
 * PC端
 * 在本地进行文件保存
 * @param data          要保存到本地的图片数据
 * @param filename      文件名
 */
function saveImageInPC(data: string, filename: string) {
    // 生成一个a元素
    const a = document.createElement('a');
    // 创建一个单击事件
    const event = new MouseEvent('click');
    // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘我的报告单’作为默认名称
    a.download = filename || '我的报告单';
    // 将生成的URL设置为a.href属性
    a.href = data;
    // 触发a的单击事件
    a.dispatchEvent(event);
}
