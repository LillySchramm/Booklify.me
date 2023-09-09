import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, catchError, map, of, take } from 'rxjs';
import { AuthService } from 'src/app/api';
import { UserActions } from 'src/app/state/user/user.actions';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private auth: AuthService,
        private router: Router,
        private store: Store,
    ) {}

    canActivate(): Observable<boolean> {
        return this.auth.authControllerGetSession().pipe(
            take(1),
            map((session) => {
                this.store.dispatch(new UserActions.NewSession(session));
                return !!session;
            }),
            catchError(() => {
                this.router.navigate(['login']);
                return of(false);
            }),
        );
    }
}
