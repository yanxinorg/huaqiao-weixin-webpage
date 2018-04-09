import {LocalStorageService} from './local.storage.service';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private router: Router,
                private  localStorage: LocalStorageService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.localStorage.get('MrS') !== '') {
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}
