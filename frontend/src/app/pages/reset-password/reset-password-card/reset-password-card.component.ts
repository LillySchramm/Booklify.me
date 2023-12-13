import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslocoModule } from '@ngneat/transloco';
import { ResetPasswordFormComponent } from '../reset-password-form/reset-password-form.component';

@Component({
    selector: 'app-reset-password-card',
    standalone: true,
    imports: [MatCardModule, TranslocoModule, ResetPasswordFormComponent],
    templateUrl: './reset-password-card.component.html',
    styleUrls: ['./reset-password-card.component.scss'],
})
export class ResetPasswordCardComponent {}
