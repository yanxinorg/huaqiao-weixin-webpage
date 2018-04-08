import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackboneService} from '../../services/backbone.service';
import {LocalStorageService} from '../../services/local.storage.service';

@Component({
    selector: 'app-list-card',
    templateUrl: './list-card.component.html',
    styleUrls: ['./list-card.component.css']
})
export class ListCardComponent implements OnInit {
    cards: any[];
    MrS = '';

    constructor(private route: ActivatedRoute,
                private router: Router,
                private localStorage: LocalStorageService,
                private backbone: BackboneService) {
    }

    ngOnInit() {
        this.MrS = this.localStorage.get('MrS');
        this.route.data
            .subscribe((data: { cardListResolver: any }) => {
                this.cards = data.cardListResolver.map(item => {
                    item.isShowMore = false;
                    return item;
                });
            });
    }

    unbindPatientIdCard(cardid: string, phone: string) {
        this.localStorage.set('CardID', cardid);
        this.localStorage.set('Phone', phone);
        // this.router.navigate(['/card/unbind', {cardid: cardid, phone: phone, s: s}]).then();
        this.router.navigate(['/card/unbind']).then();
    }

    setAsDefaultPatientIdCard(cardid: string): void {
        this.backbone.setAsDefaultPatientIdCard(this.MrS, cardid)
            .subscribe(data => {
                if (data.code === 0) {
                    this.cards = this.cards.map(item => {
                        item.cardid === cardid ? item.isDefault = 1 : item.isDefault = 0;
                        item.isShowMore = false;
                        return item;
                    });
                }
            });
    }
}
