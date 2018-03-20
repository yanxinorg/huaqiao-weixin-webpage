import {Observable} from 'rxjs/Observable';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BackboneService} from '../backbone.service';
import {Injectable} from '@angular/core';

@Injectable()
export class UserInfoResolver implements Resolve<any> {
    constructor(private backbone: BackboneService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        console.log('========== UserInfoResolver ==========');
        const session = route.paramMap.get('s');
        console.log('session: | ' + session);
        return this.backbone.getUserInfo(session);
    }
}

