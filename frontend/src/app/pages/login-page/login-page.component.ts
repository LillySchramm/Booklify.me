import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/api';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    public openGithubAuth(): void {
        window.open(
            'https://github.com/login/oauth/authorize?scope=user:email&client_id=' +
                environment.oAuthClientId,
            '_self'
        );
    }
}
