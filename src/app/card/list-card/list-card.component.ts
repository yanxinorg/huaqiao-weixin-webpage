import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BackboneService} from '../../services/backbone.service';

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
                private backbone: BackboneService) {
    }

    ngOnInit() {
        this.route.paramMap
            .subscribe(param => {
                this.MrS = param.get('s');
            });
        this.route.data
            .subscribe((data: { cardListResolver: any }) => {
                this.cards = data.cardListResolver.map(item => {
                    item.isShowMore = false;
                    return item;
                });
            });
    }

    unbindPatientIdCard(cardid: string, phone: string, s: string) {
        this.router.navigate(['/card/unbind', {cardid: cardid, phone: phone, s: s}]).then();
    }

    setAsDefaultPatientIdCard(cardid: string, s: string): void {
        console.log('==============================================');
        console.log('=========  setAsDefaultPatientIdCard  ========');
        this.backbone.setAsDefaultPatientIdCard(s, cardid)
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
