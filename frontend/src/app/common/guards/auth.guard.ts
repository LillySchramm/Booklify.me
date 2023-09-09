import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, catchError, map, of, take } from 'rxjs';
import { AuthService } from 'src/app/api';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private auth: AuthService,
        private router: Router,
    ) {}

    canActivate(): Observable<boolean> {
        return this.auth.authControllerGetSession().pipe(
            take(1),
            map((session) => !!session),
            catchError(() => {
                this.router.navigate(['login']);
                return of(false);
            }),
        );
    }
}
