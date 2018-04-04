import {Component, OnInit} from '@angular/core';
import {SmsMessage} from '../../services/backbone.structure';
import {ActivatedRoute, Router} from '@angular/router';
import {BackboneService} from '../../services/backbone.service';
import {HintModalComponent} from '../../widget/hint-modal/hint-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-unbind-card',
    templateUrl: './unbind-card.component.html',
    styleUrls: ['./unbind-card.component.css']
})
export class UnbindCardComponent implements OnInit {
    errorMessage = '';
    cardid = '';
    bindingPhone = '';
    verificationCode = '';
    verificationSms: SmsMessage;
    MrS = '';

    constructor(private route: ActivatedRoute,
                private router: Router,
                private modalService: NgbModal,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.cardid = params.get('cardid');
            this.bindingPhone = params.get('phone');
            this.MrS = params.get('s');
            this.errorMessage = `验证码已发送到手机尾号${ this.bindingPhone.substr(7, 4) }的手机上，请注意查收！`;
        });
        this.route.data
            .subscribe((data: { removeCardResolver: any }) => {
                if (data.removeCardResolver.hasOwnProperty('Message') && data.removeCardResolver.Message === 'OK') {
                    this.verificationSms = data.removeCardResolver;
                } else {
                    this.errorMessage = data.removeCardResolver;
                }
            });
    }

    unbindPatientIdCard(): void {
        if (typeof this.verificationSms === 'undefined') {
            this.errorMessage = '请输入正确的验证码';
        } else {
            this.backbone
                .unbindPatientIdCard(this.verificationSms, this.bindingPhone, this.verificationCode, this.cardid)
                .subscribe(data => {
                    console.log(data);
                    if (data.code === 0) {
                        this.openHintModal('成功', `就诊卡${ this.cardid }已解绑`);
                    } else if (data.code === -300) {
                        this.errorMessage = data.msg;
                    } else {
                        this.errorMessage = '发生错误';
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
                this.router.navigate(['/card/list', {s: this.MrS}]).then();
            });
    }
}
