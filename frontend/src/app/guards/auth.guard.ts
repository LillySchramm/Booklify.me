import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { GeneralService } from '../api';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private generalService: GeneralService
    ) {}
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> {
        const rejectAuthenticated = route.data['rejectAuthenticated'];
        return this.generalService.ping().pipe(
            switchMap(() => {
                return of(
                    rejectAuthenticated ? this.router.createUrlTree([]) : true
                );
            }),
            catchError(() => {
                localStorage.removeItem('auth');
                return of(
                    rejectAuthenticated
                        ? true
                        : this.router.createUrlTree(['/login'])
                );
            })
        );
    }
}
