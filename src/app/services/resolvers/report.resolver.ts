import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {BackboneService} from '../backbone.service';
import {LocalStorageService} from '../local.storage.service';

@Injectable()
export class ReportInspectionResolver implements Resolve<any> {
    constructor(private localStorage: LocalStorageService,
                private backbone: BackboneService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        // const rid = route.paramMap.get('rid');
        const rid = this.localStorage.getObject('Report').rid.toString();
        return this.backbone.getSpecificReport(rid);
    }
}
