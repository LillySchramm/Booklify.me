import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { TokenService } from 'src/app/common/services/token.service';
import { LoginCardComponent } from './login-card/login-card.component';
import { SignupCardComponent } from './signup-card/signup-card.component';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        LoginCardComponent,
        SignupCardComponent,
        TranslocoModule,
    ],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    constructor(tokenService: TokenService) {
        tokenService.deleteToken();
    }
}
