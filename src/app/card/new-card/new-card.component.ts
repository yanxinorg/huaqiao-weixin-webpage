import {Component, OnInit} from '@angular/core';
import {BackboneService} from '../../services/backbone.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-new-card',
    templateUrl: './new-card.component.html',
    styleUrls: ['./new-card.component.css']
})
export class NewCardComponent implements OnInit {
    errorMessage = '';
    patientName = '';
    bindingPhone = '';
    MrS = '';

    constructor(private route: ActivatedRoute,
                private router: Router,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        this.MrS = this.route.snapshot.paramMap.get('s');
        if (typeof this.MrS === 'undefined' || this.MrS === null) {
            this.errorMessage = '请重新登录';
        }
    }

    bindPatientIdCard(): void {
        this.backbone.validatePatientIdCard(this.patientName, this.bindingPhone, this.MrS)
            .subscribe(data => {
                console.log(data);
                if (data.code === 0) {
                    this.router.navigate(['/card/check', {
                        s: this.MrS,
                        cardid: data.cardid,
                        name: this.patientName,
                        phone: this.bindingPhone
                    }]).then();
                } else if (data.code === -500) {
                    this.errorMessage = '该就诊卡已成功绑定，请勿重复操作。';
                }
                else {
                    this.errorMessage = '未找到要绑定的就诊卡';
                }
            });
    }
}
