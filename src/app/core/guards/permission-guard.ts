import {Injectable} from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Data,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {CurrentUserService} from '@bang/common';
import {tap} from 'rxjs/operators';
import {appRoutesLinks} from '@app/app.routes.links';

@Injectable({
    providedIn: 'root'
})
export class PermissionGuard implements CanActivate, CanActivateChild {

    constructor(private currentUserService: CurrentUserService,
                private router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.hasAccessToRole(next.data);
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.hasAccessToRole(next.data);
    }

    private hasAccessToRole(data: Data): Observable<boolean> {
        return this.currentUserService.hasAnyRoleWithAnyContext(data.role).pipe(
            tap(hasRole => hasRole || this.router.navigate(appRoutesLinks.ERROR, {queryParams: {code: 403}}))
        );
    }
}
