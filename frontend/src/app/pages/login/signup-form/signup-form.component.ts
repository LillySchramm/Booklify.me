import { Component, OnInit, ViewChild } from '@angular/core';
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
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, Select, Store, ofActionDispatched } from '@ngxs/store';
import {
    RecaptchaComponent,
    RecaptchaFormsModule,
    RecaptchaModule,
} from 'ng-recaptcha';
import { Observable } from 'rxjs';
import { CaptchaDisclaimerComponent } from 'src/app/common/components/captcha-disclaimer/captcha-disclaimer.component';
import { FormErrorPipe } from 'src/app/common/pipes/form-error.pipe';
import { CustomValidators } from 'src/app/common/validators/validators';
import { SystemState } from 'src/app/state/system/system.state';
import { UserActions } from 'src/app/state/user/user.actions';
import { UserState } from 'src/app/state/user/user.state';

@UntilDestroy()
@Component({
    selector: 'app-signup-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        TranslocoModule,
        FormErrorPipe,
        MatIconModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        CaptchaDisclaimerComponent,
    ],
    templateUrl: './signup-form.component.html',
    styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
    @Select(UserState.signUpDisabled) signUpDisabled$!: Observable<boolean>;
    $signUpDisabled = toSignal(this.signUpDisabled$);

    @Select(SystemState.recaptchaEnabled)
    recaptchaEnabled$!: Observable<boolean>;
    $recaptchaEnabled = toSignal(this.recaptchaEnabled$);

    @Select(SystemState.recaptchaSiteKey)
    recaptchaSiteKey$!: Observable<string>;
    $recaptchaSiteKey = toSignal(this.recaptchaSiteKey$);

    @ViewChild('recaptcha', { static: false })
    recaptchaRef!: RecaptchaComponent;

    hide1 = true;
    hide2 = true;

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

    constructor(
        private readonly store: Store,
        private actions$: Actions,
    ) {
        this.form
            .get('password2')
            ?.setValidators(
                CustomValidators.passwordsNotEqualValidator(() => this.form),
            );
        this.actions$
            .pipe(ofActionDispatched(UserActions.VerifyEmailSuccess))
            .subscribe(() => this.form.reset(undefined, { emitEvent: false }));
    }

    ngOnInit(): void {
        this.signUpDisabled$
            .pipe(untilDestroyed(this))
            .subscribe((disabled) => {
                if (disabled) {
                    this.form.disable();
                } else {
                    this.form.enable();
                }
            });
    }

    onCaptchaResolved(token: string | null): void {
        if (!token) {
            return;
        }

        this.store.dispatch(
            new UserActions.SignUp({
                email: this.form.get('email')!.value!,
                name: this.form.get('username')!.value!,
                password: this.form.get('password1')!.value!,
                recaptchaToken: token,
            }),
        );
    }

    public onSubmit(): void {
        if (!this.form.valid) {
            return;
        }

        this.recaptchaRef.reset();
        this.recaptchaRef.execute();
    }
}
