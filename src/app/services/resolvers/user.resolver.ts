import {Observable} from 'rxjs/Observable';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BackboneService} from '../backbone.service';
import {Injectable} from '@angular/core';
import {LocalStorageService} from '../local.storage.service';

@Injectable()
export class UserInfoResolver implements Resolve<any> {
    constructor(private localStorage: LocalStorageService,
                private backbone: BackboneService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        // const session = route.paramMap.get('s');
        const MrS = this.localStorage.get('MrS');
        return this.backbone.getUserInfo(MrS);
    }
}
