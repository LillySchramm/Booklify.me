import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FormErrorPipe } from 'src/app/pipes/form-error.pipe';
import { UserActions } from 'src/app/state/user/user.actions';
import { UserState } from 'src/app/state/user/user.state';

@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        TranslocoModule,
        FormErrorPipe,
        MatIconModule,
    ],
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
    @Select(UserState.signInInProgress) signInDisabled$!: Observable<boolean>;
    $signInDisabled = toSignal(this.signInDisabled$);

    hide = true;

    public form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(private store: Store) {}

    submit(): void {
        if (
            this.form.invalid ||
            !this.form.value.email ||
            !this.form.value.password
        ) {
            return;
        }

        this.store.dispatch(
            new UserActions.SignIn({
                email: this.form.value.email,
                password: this.form.value.password,
            }),
        );
    }
}
