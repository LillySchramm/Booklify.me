import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslocoModule } from '@ngneat/transloco';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
    selector: 'app-login-card',
    standalone: true,
    imports: [CommonModule, LoginFormComponent, MatCardModule, TranslocoModule],
    templateUrl: './login-card.component.html',
    styleUrls: ['./login-card.component.scss'],
})
export class LoginCardComponent {}
