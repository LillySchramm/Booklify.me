import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable, Subject, catchError, map, of, take } from 'rxjs';
import { AuthService } from 'src/app/api';
import { UserActions } from 'src/app/state/user/user.actions';
import { TokenService } from '../services/token.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private auth: AuthService,
        private router: Router,
        private store: Store,
        private tokenService: TokenService,
    ) {}

    canActivate(): Observable<boolean> {
        const success$ = new Subject<boolean>();
        this.tokenService.refresh();

        this.auth
            .authControllerGetSession()
            .pipe(
                take(1),
                map((session) => {
                    this.store.dispatch(new UserActions.NewSession(session));
                    success$.next(!!session);
                }),
                catchError(() => {
                    this.router.navigate(['login']);
                    success$.next(false);
                    return of(false);
                }),
            )
            .subscribe();

        return success$;
    }
}
