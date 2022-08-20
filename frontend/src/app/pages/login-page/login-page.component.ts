import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { GeneralService } from 'src/app/api';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    private oAuthClientId = '';

    constructor(private generalService: GeneralService) {}

    ngOnInit(): void {
        this.generalService
            .config()
            .pipe(take(1))
            .subscribe((config) => {
                this.oAuthClientId = config.GITHUB_CLIENT_ID;
            });
    }

    public openGithubAuth(): void {
        window.open(
            'https://github.com/login/oauth/authorize?scope=user:email&client_id=' +
                this.oAuthClientId,
            '_self'
        );
    }
}
