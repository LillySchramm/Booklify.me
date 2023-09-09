import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ResetPasswordCardComponent } from './reset-password-card/reset-password-card.component';

@Component({
    selector: 'app-reset-password',
    standalone: true,
    imports: [CommonModule, ResetPasswordCardComponent],
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {}
