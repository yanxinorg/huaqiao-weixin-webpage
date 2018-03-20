import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BackboneService} from '../backbone.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ReportInspectionResolver implements Resolve<any> {
    constructor(private backbone: BackboneService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const rid = route.paramMap.get('rid');
        return this.backbone.getSpecificReport(rid);
    }
}
