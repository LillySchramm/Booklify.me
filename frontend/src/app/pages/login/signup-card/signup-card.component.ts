import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslocoModule } from '@ngneat/transloco';
import { SignupFormComponent } from '../signup-form/signup-form.component';

@Component({
    selector: 'app-signup-card',
    standalone: true,
    imports: [
        CommonModule,
        SignupFormComponent,
        MatCardModule,
        TranslocoModule,
    ],
    templateUrl: './signup-card.component.html',
    styleUrls: ['./signup-card.component.scss'],
})
export class SignupCardComponent {}
