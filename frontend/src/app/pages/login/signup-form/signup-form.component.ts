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
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';
import { CustomValidators } from 'src/app/common/validators/validators';
import { FormErrorPipe } from 'src/app/pipes/form-error.pipe';

@Component({
    selector: 'app-signup-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        TranslocoModule,
        FormErrorPipe,
    ],
    templateUrl: './signup-form.component.html',
    styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent {
    public form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', [
            Validators.required,
            CustomValidators.usernameMinLengthValidator(),
            CustomValidators.usernameMaxLengthValidator(),
            CustomValidators.usernameRegexValidator(),
        ]),
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

    constructor() {
        this.form
            .get('password2')
            ?.setValidators(
                CustomValidators.passwordsNotEqualValidator(() => this.form),
            );
    }
}
