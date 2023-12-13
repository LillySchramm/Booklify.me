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
import { RouterModule } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NewPasswordDto } from 'src/app/api';
import { FormErrorPipe } from 'src/app/common/pipes/form-error.pipe';
import { CustomValidators } from 'src/app/common/validators/validators';
import { UserActions } from 'src/app/state/user/user.actions';
import { UserState } from 'src/app/state/user/user.state';

@UntilDestroy()
@Component({
    selector: 'app-reset-password-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        TranslocoModule,
        FormErrorPipe,
        MatIconModule,
        RouterModule,
    ],
    templateUrl: './reset-password-form.component.html',
    styleUrls: ['./reset-password-form.component.scss'],
})
export class ResetPasswordFormComponent {
    @Select(UserState.requestPasswordResetSuccess)
    requestResetSuccess$!: Observable<boolean | undefined>;
    $requestResetSuccess = toSignal(this.requestResetSuccess$);

    @Select(UserState.requestPasswordResetInProgress)
    requestInProgress$!: Observable<boolean>;
    $requestInProgress = toSignal(this.requestInProgress$);

    @Select(UserState.resetPasswordInProgress)
    resetPasswordInProgress$!: Observable<boolean | undefined>;
    $resetPasswordInProgress = toSignal(this.resetPasswordInProgress$);

    @Select(UserState.resetPasswordSuccess)
    resetPasswordSuccess$!: Observable<boolean>;
    $resetPasswordSuccess = toSignal(this.resetPasswordSuccess$);

    hide1 = true;
    hide2 = true;

    request = true;
    reset = false;

    text = '';

    resetContent?: NewPasswordDto;

    public resetForm = new FormGroup({
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

    public requestForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
    });

    constructor(
        private transloco: TranslocoService,
        private store: Store,
    ) {
        const urlParams = new URLSearchParams(window.location.search);
        const resetId = urlParams.get('reset_id');
        const userId = urlParams.get('user_id');
        const token = urlParams.get('token');

        if (resetId && userId && token) {
            this.request = false;
            this.reset = true;

            this.resetContent = {
                resetId,
                userId,
                resetToken: token,
                newPassword: '',
            };
        }

        this.resetForm
            .get('password2')
            ?.setValidators(
                CustomValidators.passwordsNotEqualValidator(
                    () => this.resetForm,
                ),
            );

        this.requestResetSuccess$
            .pipe(untilDestroyed(this))
            .subscribe((success) => {
                if (success) {
                    this.text = this.transloco.translate(
                        'reset-password.request-success',
                        { email: this.requestForm.value.email },
                    );

                    this.store.dispatch(new UserActions.ClearResetRequest());
                }
            });

        this.resetPasswordSuccess$
            .pipe(untilDestroyed(this))
            .subscribe((success) => {
                if (success) {
                    this.text = this.transloco.translate(
                        'reset-password.reset-success',
                    );

                    this.store.dispatch(new UserActions.ClearResetRequest());
                }
            });
    }

    submitRequest(): void {
        if (this.requestForm.invalid || !this.requestForm.value.email) {
            return;
        }

        this.store.dispatch(
            new UserActions.RequestReset(this.requestForm.value.email),
        );
    }

    submitReset(): void {
        if (
            this.resetForm.invalid ||
            !this.resetContent ||
            !this.resetForm.value.password1
        ) {
            return;
        }

        this.resetContent.newPassword = this.resetForm.value.password1;

        this.store.dispatch(new UserActions.ResetPassword(this.resetContent));
    }
}
