import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { Store } from '@ngxs/store';
import { FormErrorPipe } from 'src/app/common/pipes/form-error.pipe';
import { CustomValidators } from 'src/app/common/validators/validators';
import { UserActions } from 'src/app/state/user/user.actions';

@Component({
    selector: 'app-new-password-form',
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
    templateUrl: './new-password-form.component.html',
    styleUrls: ['./new-password-form.component.scss'],
})
export class NewPasswordFormComponent {
    hide1 = true;
    hide2 = true;
    hide3 = true;

    public form = new FormGroup({
        currentPassword: new FormControl('', [Validators.required]),
        password1: new FormControl('', [
            Validators.required,
            CustomValidators.passwordMinLengthValidator(),
            CustomValidators.passwordContainsLowercaseValidator(),
            CustomValidators.passwordContainsUppercaseValidator(),
            CustomValidators.passwordContainsNumberValidator(),
            CustomValidators.passwordContainsSpecialCharacterValidator(),
        ]),
        password2: new FormControl('', [Validators.required]),
    });

    constructor(private store: Store) {
        this.form
            .get('password2')
            ?.setValidators(
                CustomValidators.passwordsNotEqualValidator(() => this.form),
            );
    }

    submit() {
        if (this.form.invalid) {
            return;
        }
        this.store.dispatch(
            new UserActions.ChangePassword({
                newPassword: this.form.get('password1')!.value!,
                oldPassword: this.form.get('currentPassword')!.value!,
            }),
        );
    }
}
