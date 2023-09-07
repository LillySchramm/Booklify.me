import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslocoModule } from '@ngneat/transloco';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserState } from 'src/app/state/user/user.state';
import { SignupFormComponent } from '../signup-form/signup-form.component';

@Component({
    selector: 'app-signup-card',
    standalone: true,
    imports: [
        CommonModule,
        SignupFormComponent,
        MatCardModule,
        TranslocoModule,
        MatProgressBarModule,
    ],
    templateUrl: './signup-card.component.html',
    styleUrls: ['./signup-card.component.scss'],
})
export class SignupCardComponent {
    @Select(UserState.signUpInProgress) signUpDisabled$!: Observable<boolean>;
    $signUpInProgress = toSignal(this.signUpDisabled$);
}
