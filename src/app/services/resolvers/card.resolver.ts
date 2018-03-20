import {Observable} from 'rxjs/Observable';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BackboneService} from '../backbone.service';
import {Injectable} from '@angular/core';

@Injectable()
export class CardListResolver implements Resolve<any> {
    constructor(private backbone: BackboneService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const session = route.paramMap.get('s');
        return this.backbone.getCardList(session);
    }
}

@Injectable()
export class RemoveCardResolver implements Resolve<any> {
    constructor(private backbone: BackboneService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const cardid = route.paramMap.get('cardid');
        return this.backbone.unbindSafetyInspection(cardid);
    }
}
