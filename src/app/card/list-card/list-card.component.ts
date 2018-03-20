import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-list-card',
    templateUrl: './list-card.component.html',
    styleUrls: ['./list-card.component.css']
})
export class ListCardComponent implements OnInit {
    cards: any[];
    MrS = '';

    constructor(private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.MrS = this.route.snapshot.paramMap.get('s');
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
}
