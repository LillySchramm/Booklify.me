import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService, LoginSuccessResponse } from 'src/app/api';

@Component({
    selector: 'app-login-page',
    templateUrl: './github-success-page.component.html',
    styleUrls: ['./github-success-page.component.scss'],
})
export class GithubSuccessPageComponent implements OnInit {
    constructor(private authService: AuthService) {}

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

        console.log(bearerResponse.bearer);
    }
}
