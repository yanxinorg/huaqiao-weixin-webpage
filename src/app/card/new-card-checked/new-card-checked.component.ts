import {Component, OnInit} from '@angular/core';
import {SmsMessage} from '../../services/backbone.structure';
import {ActivatedRoute, Router} from '@angular/router';
import {BackboneService} from '../../services/backbone.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HintModalComponent} from '../../widget/hint-modal/hint-modal.component';

@Component({
    selector: 'app-new-card-checked',
    templateUrl: './new-card-checked.component.html',
    styleUrls: ['./new-card-checked.component.css']
})
export class NewCardCheckedComponent implements OnInit {
    patientName = '';
    bindingPhone = '';
    MrS = '';
    cardid = '';
    verificationCode = '';
    verificationSms: SmsMessage;
    errorMessage = '';

    constructor(private route: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.MrS = params.get('s');
            this.patientName = params.get('name');
            this.bindingPhone = params.get('phone');
            this.cardid = params.get('cardid');
            this.errorMessage = `验证码将发送到尾号为${ this.bindingPhone.substr(7, 4) }的手机上`;
        });
        // this.MrS = this.route.snapshot.paramMap.get('s');
        // this.patientName = this.route.snapshot.paramMap.get('name');
        // this.bindingPhone = this.route.snapshot.paramMap.get('phone');
        // this.cardid = this.route.snapshot.paramMap.get('cardid');
        // this.errorMessage = `验证码将发送到尾号为${ this.bindingPhone.substr(7, 4) }的手机上`;
    }

    /**
     * 发送验证码
     *      --  下发失败，弹出提示
     * @param response
     */
    sentVerificationCodeCompleted(response: SmsMessage): void {
        if (response.Code === 'OK') {
            this.verificationSms = response;
            // 成功发送验证码
            // 记录   requestId, bizId
            // this.newUser.requestId = response.RequestId;
            // this.newUser.bizId = response.BizId;
        } else {
            this.errorMessage = response.Message;
        }
    }

    bindPatientIdCard(): void {
        if (typeof this.verificationSms === 'undefined') {
            this.errorMessage = '验证码输入有误！';
        } else {
            this.backbone.bindPatientIdCard(
                this.verificationSms,
                this.bindingPhone,
                this.verificationCode,
                this.patientName,
                this.MrS,
                this.cardid)
                .subscribe(data => {
                    console.log(data);
                    if (data.code === -100) {
                        this.openHintModal('出错了', `就诊卡${ this.cardid }已经绑定过了`);
                    } else {
                        this.openHintModal('成功', `成功绑定就诊卡${ this.cardid }`);
                    }
                });
        }
    }

    /**
     * 显示提示框
     */
    public openHintModal(title: string, content: string) {
        const hintModalRef = this.modalService.open(HintModalComponent);
        console.log('openHintModal');
        hintModalRef.componentInstance.title = title;
        hintModalRef.componentInstance.content = content;
        hintModalRef.result.then(
            /**
             * close
             * @param reason
             */
            (reason) => {
                // console.log('Close - ' + reason);
            },
            /**
             * dismiss
             * @param reason
             */
            (reason) => {
                console.log('Dismiss - ' + reason);
                this.router.navigate(['/card/list', {s: this.MrS}]).then();
            });
    }

}
