import {Component, OnInit} from '@angular/core';
import {BackboneService} from '../../services/backbone.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local.storage.service';

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

    constructor(private router: Router,
                private localStorage: LocalStorageService,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        this.MrS = this.localStorage.get('MrS');
    }

    bindPatientIdCard(): void {
        if (this.MrS === '') {
            return;
        }
        this.backbone.validatePatientIdCard(this.patientName, this.bindingPhone, this.MrS)
            .subscribe(data => {
                if (data.code === 0) {
                    this.localStorage.set('CardID', data.cardid);
                    this.localStorage.set('Name', this.patientName);
                    this.localStorage.set('Phone', this.bindingPhone);
                    this.router.navigate(['/card/check']);
                } else if (data.code === -500) {
                    this.errorMessage = '该就诊卡已成功绑定，请勿重复操作。';
                } else {
                    this.errorMessage = '未找到要绑定的就诊卡';
                }
            });
    }
}
