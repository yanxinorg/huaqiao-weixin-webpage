import {Component, OnInit} from '@angular/core';
import {SmsMessage} from '../../services/backbone.structure';
import {Router} from '@angular/router';
import {BackboneService} from '../../services/backbone.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HintModalComponent} from '../../widget/hint-modal/hint-modal.component';
import {LocalStorageService} from '../../services/local.storage.service';

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

    constructor(private router: Router,
                private modalService: NgbModal,
                private localStorage: LocalStorageService,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        // this.route.paramMap.subscribe(params => {
        //     this.MrS = params.get('s');
        //     this.patientName = params.get('name');
        //     this.bindingPhone = params.get('phone');
        //     this.cardid = params.get('cardid');
        //     this.errorMessage = `点击发送验证码到尾号为${ this.bindingPhone.substr(7, 4) }的手机上`;
        // });
        this.MrS = this.localStorage.get('MrS');
        this.patientName = this.localStorage.get('Name');
        this.bindingPhone = this.localStorage.get('Phone');
        this.cardid = this.localStorage.get('CardID');
        this.errorMessage = `点击发送验证码到尾号为${ this.bindingPhone.substr(7, 4) }的手机上`;
    }

    /**
     * 发送验证码
     *      --  下发失败，弹出提示
     * @param response
     */
    sentVerificationCodeCompleted(response: SmsMessage): void {
        if (response.Code === 'OK') {
            // 成功发送验证码
            // 记录   requestId, bizId
            this.verificationSms = response;
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
                    this.errorMessage = '';
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
                this.router.navigate(['/card/list']);
            });
    }

}
