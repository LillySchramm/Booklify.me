import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService, GeneralService, LoginSuccessResponse } from 'src/app/api';

@Component({
    selector: 'app-login-page',
    templateUrl: './github-success-page.component.html',
    styleUrls: ['./github-success-page.component.scss'],
})
export class GithubSuccessPageComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) {}

    async ngOnInit(): Promise<void> {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const code = urlParams.get('code');

        if (!code) {
            return;
        }

        const bearerResponse: LoginSuccessResponse = await firstValueFrom(
            this.authService.auth(code)
        );
        if (!bearerResponse) {
            return;
        }
        localStorage.setItem('auth', bearerResponse.bearer);

        this.router.navigate(['']);
    }
}
