import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs';
import { AuthService, UserDto } from 'src/app/api';
import { SnackBarService } from 'src/app/common/services/snack-bar.service';
import { UserActions } from './user.actions';

interface UserStateModel {
    currentUser?: UserDto;
    signup: {
        loading: boolean;
        resending: boolean;
        success?: boolean;
        error?: string;
    };
    signin: {
        loading: boolean;
        error?: string;
    };
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        signup: {
            loading: false,
            resending: false,
        },
        signin: {
            loading: false,
        },
    },
})
@Injectable()
export class UserState {
    constructor(
        private authApi: AuthService,
        private router: Router,
        private snack: SnackBarService,
        private transloco: TranslocoService,
    ) {}

    @Action(UserActions.SignUp)
    signUp(ctx: StateContext<UserStateModel>, action: UserActions.SignUp) {
        ctx.patchState({
            signup: {
                ...ctx.getState().signup,
                loading: true,
            },
        });

        return this.authApi.authControllerSignUp(action.user).pipe(
            tap((user) => {
                if (user.activated) {
                    ctx.dispatch(new UserActions.VerifyEmailSuccess());
                    ctx.setState({
                        signup: {
                            loading: false,
                            resending: false,
                        },
                        signin: { loading: false },
                        currentUser: undefined,
                    });
                } else ctx.dispatch(new UserActions.SignUpSuccess(user));
            }),
            catchError((error) =>
                ctx.dispatch(new UserActions.SignUpError(error.error.message)),
            ),
        );
    }

    @Action(UserActions.SignIn)
    signIn(ctx: StateContext<UserStateModel>, action: UserActions.SignIn) {
        ctx.patchState({
            signin: {
                ...ctx.getState().signin,
                loading: true,
            },
        });

        return this.authApi.authControllerSignIn(action.user).pipe(
            tap((user) => ctx.dispatch(new UserActions.SignInSuccess(user))),
            catchError((error) =>
                ctx.dispatch(new UserActions.SignInError(error.error.message)),
            ),
        );
    }

    @Action(UserActions.SignInSuccess)
    signInSuccess(
        ctx: StateContext<UserStateModel>,
        action: UserActions.SignInSuccess,
    ) {
        ctx.patchState({
            signin: {
                ...ctx.getState().signin,
                loading: false,
                error: undefined,
            },
        });

        localStorage.setItem('accessToken', action.response.accessToken);
        this.snack.show('Login successful. Welcome back!');

        // TODO: navigate to home page
        // this.router.navigate(['']);
    }

    @Action(UserActions.ResendConfirmation)
    resend(ctx: StateContext<UserStateModel>) {
        const userId = ctx.getState().currentUser?.id;
        if (!userId) return;

        ctx.patchState({
            signup: {
                ...ctx.getState().signup,
                resending: true,
            },
        });

        return this.authApi
            .authControllerResend(userId)
            .pipe(
                tap(() =>
                    ctx.dispatch(new UserActions.ResendConfirmationSuccess()),
                ),
            );
    }

    @Action(UserActions.ResendConfirmationSuccess)
    resendSuccess(ctx: StateContext<UserStateModel>) {
        const userId = ctx.getState().currentUser?.id;
        if (!userId) return;

        ctx.patchState({
            signup: {
                ...ctx.getState().signup,
                resending: false,
            },
        });
    }

    @Action(UserActions.SignUpSuccess)
    signUpSuccess(
        ctx: StateContext<UserStateModel>,
        action: UserActions.SignUpSuccess,
    ) {
        ctx.patchState({
            signup: {
                ...ctx.getState().signup,
                loading: false,
                success: true,
                error: undefined,
            },
            currentUser: action.user,
        });

        this.router.navigate(['signup-success']);
    }

    @Action(UserActions.SignUpError)
    signUpError(
        ctx: StateContext<UserStateModel>,
        action: UserActions.SignUpError,
    ) {
        this.snack.show('Could not create account: ' + action.error);
        ctx.patchState({
            signup: {
                ...ctx.getState().signup,
                loading: false,
                error: action.error,
            },
        });
    }

    @Action(UserActions.SignInError)
    signInError(
        ctx: StateContext<UserStateModel>,
        action: UserActions.SignInError,
    ) {
        this.snack.show('Wrong credentials please try again.');
        ctx.patchState({
            signin: {
                ...ctx.getState().signin,
                loading: false,
                error: action.error,
            },
        });
    }

    @Action(UserActions.VerifyEmail)
    verify(ctx: StateContext<UserStateModel>, action: UserActions.VerifyEmail) {
        return this.authApi
            .authControllerVerify(action.userId, action.key, action.id)
            .pipe(
                tap(() => ctx.dispatch(new UserActions.VerifyEmailSuccess())),
                catchError(() =>
                    ctx.dispatch(new UserActions.VerifyEmailError()),
                ),
            );
    }

    @Action(UserActions.VerifyEmailSuccess)
    verifySuccess() {
        this.snack.show(this.transloco.translate('verifyEmail.success'));
        this.router.navigate(['login']);
    }

    @Action(UserActions.VerifyEmailError)
    verifyError() {
        this.snack.show(this.transloco.translate('verifyEmail.error'));
        this.router.navigate(['login']);
    }

    @Selector()
    static currentUser(state: UserStateModel) {
        return state.currentUser;
    }

    @Selector()
    static currentUserEmail(state: UserStateModel) {
        return state.currentUser?.email;
    }

    @Selector()
    static resending(state: UserStateModel) {
        return state.signup.resending;
    }

    @Selector()
    static signUpInProgress(state: UserStateModel): boolean {
        return state.signup.loading;
    }

    @Selector()
    static signInInProgress(state: UserStateModel): boolean {
        return state.signin.loading;
    }

    @Selector()
    static signUpDisabled(state: UserStateModel): boolean {
        return state.signup.loading || !!state.currentUser;
    }

    @Selector()
    static signUpError(state: UserStateModel): string | undefined {
        return state.signup.error;
    }
}
