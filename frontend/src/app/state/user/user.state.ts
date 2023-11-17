import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import {
    Action,
    Selector,
    State,
    StateContext,
    createSelector,
} from '@ngxs/store';
import { catchError, map, take, tap } from 'rxjs';
import {
    AuthService,
    BasicUserDto,
    SessionDto,
    UserDto,
    UserFlagsDto,
    UserFlagsPatchDto,
    UsersService,
} from 'src/app/api';
import { SnackBarService } from 'src/app/common/services/snack-bar.service';
import { TokenService } from 'src/app/common/services/token.service';
import { UserActions } from './user.actions';

interface UserStateModel {
    currentUser?: UserDto;
    otherUsersMap: { [key: string]: BasicUserDto };
    session?: SessionDto;
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
    requestPasswordReset: {
        loading: boolean;
        success?: boolean;
        error?: string;
    };
    resetPassword: {
        loading: boolean;
        success?: boolean;
        error?: string;
    };
    flags?: UserFlagsDto;
    sessions?: SessionDto[];
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
        requestPasswordReset: {
            loading: false,
        },
        resetPassword: {
            loading: false,
        },
        otherUsersMap: {},
    },
})
@Injectable()
export class UserState {
    constructor(
        private authApi: AuthService,
        private userApi: UsersService,
        private router: Router,
        private snack: SnackBarService,
        private transloco: TranslocoService,
        private token: TokenService,
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
                        requestPasswordReset: {
                            loading: false,
                        },
                        resetPassword: {
                            loading: false,
                        },
                        otherUsersMap: {},
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

        this.token.setToken(action.response.accessToken);
        this.snack.show('Login successful. Welcome back!');

        this.router.navigate(['']);
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

    @Action(UserActions.NewSession)
    newSession(
        ctx: StateContext<UserStateModel>,
        action: UserActions.NewSession,
    ) {
        ctx.patchState({
            session: action.session,
        });
    }

    @Action(UserActions.LoadUser)
    loadUser(ctx: StateContext<UserStateModel>) {
        return this.authApi.authControllerGetProfile().pipe(
            take(1),
            map((user) => ctx.dispatch(new UserActions.LoadUserSuccess(user))),
        );
    }

    @Action(UserActions.LoadUserSuccess)
    loadUserSuccess(
        ctx: StateContext<UserStateModel>,
        action: UserActions.LoadUserSuccess,
    ) {
        ctx.patchState({
            currentUser: action.user,
        });
    }

    @Action(UserActions.LogOut)
    logOut(ctx: StateContext<UserStateModel>) {
        return this.authApi.authControllerSignOut().pipe(
            tap(() => {
                this.token.deleteToken();
                ctx.dispatch(new UserActions.LogOutSuccess());
            }),
        );
    }

    @Action(UserActions.LogOutSuccess)
    logOutSuccess(ctx: StateContext<UserStateModel>) {
        ctx.patchState({
            currentUser: undefined,
            session: undefined,
        });
        this.snack.show(this.transloco.translate('loggedOut.success'));
        this.router.navigate(['login']);
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

    @Action(UserActions.RequestReset)
    requestReset(
        ctx: StateContext<UserStateModel>,
        action: UserActions.RequestReset,
    ) {
        ctx.patchState({
            requestPasswordReset: {
                ...ctx.getState().requestPasswordReset,
                loading: true,
            },
        });

        return this.authApi
            .authControllerRequestResetPassword({ email: action.email })
            .pipe(
                tap(() => ctx.dispatch(new UserActions.RequestResetSuccess())),
                catchError((error) =>
                    ctx.dispatch(
                        new UserActions.RequestResetError(error.error.message),
                    ),
                ),
            );
    }

    @Action(UserActions.RequestResetSuccess)
    requestResetSuccess(ctx: StateContext<UserStateModel>) {
        ctx.patchState({
            requestPasswordReset: {
                ...ctx.getState().requestPasswordReset,
                loading: false,
                success: true,
                error: undefined,
            },
        });
    }

    @Action(UserActions.RequestResetError)
    requestResetError(
        ctx: StateContext<UserStateModel>,
        action: UserActions.RequestResetError,
    ) {
        ctx.patchState({
            requestPasswordReset: {
                ...ctx.getState().requestPasswordReset,
                loading: false,
                error: action.error,
            },
        });

        this.snack.show('Could not request password reset: ' + action.error);
    }

    @Action(UserActions.ClearResetRequest)
    clearResetRequest(ctx: StateContext<UserStateModel>) {
        ctx.patchState({
            requestPasswordReset: {
                ...ctx.getState().requestPasswordReset,
                loading: false,
                success: undefined,
                error: undefined,
            },
            resetPassword: {
                ...ctx.getState().resetPassword,
                loading: false,
                success: undefined,
                error: undefined,
            },
        });
    }

    @Action(UserActions.ResetPassword)
    resetPassword(
        ctx: StateContext<UserStateModel>,
        action: UserActions.ResetPassword,
    ) {
        ctx.patchState({
            resetPassword: {
                ...ctx.getState().resetPassword,
                loading: true,
            },
        });

        return this.authApi.authControllerResetPassword(action.reset).pipe(
            tap(() => ctx.dispatch(new UserActions.ResetPasswordSuccess())),
            catchError((error) =>
                ctx.dispatch(
                    new UserActions.ResetPasswordError(error.error.message),
                ),
            ),
        );
    }

    @Action(UserActions.ResetPasswordSuccess)
    resetPasswordSuccess(ctx: StateContext<UserStateModel>) {
        ctx.patchState({
            resetPassword: {
                ...ctx.getState().resetPassword,
                loading: false,
                success: true,
                error: undefined,
            },
        });
    }

    @Action(UserActions.ResetPasswordError)
    resetPasswordError(
        ctx: StateContext<UserStateModel>,
        action: UserActions.ResetPasswordError,
    ) {
        ctx.patchState({
            resetPassword: {
                ...ctx.getState().resetPassword,
                loading: false,
                error: action.error,
            },
        });

        this.snack.show('Could not reset password: ' + action.error);
    }

    @Action(UserActions.LoadUserByNickname)
    loadUserByNickname(
        ctx: StateContext<UserStateModel>,
        action: UserActions.LoadUserByNickname,
    ) {
        return this.userApi.usersControllerGetUser('', action.nickname).pipe(
            tap((user) =>
                ctx.dispatch(new UserActions.LoadUserByNicknameSuccess(user)),
            ),
            catchError((error) =>
                ctx.dispatch(
                    new UserActions.LoadUserByNicknameError(
                        error.error.message,
                    ),
                ),
            ),
        );
    }

    @Action(UserActions.LoadUserByNicknameSuccess)
    loadUserByNicknameSuccess(
        ctx: StateContext<UserStateModel>,
        action: UserActions.LoadUserByNicknameSuccess,
    ) {
        ctx.patchState({
            otherUsersMap: {
                ...ctx.getState().otherUsersMap,
                [action.user.name.toLowerCase()]: action.user,
            },
        });
    }

    @Action(UserActions.LoadUserByNicknameError)
    loadUserByNicknameError() {
        this.snack.show('User was not found');
        this.router.navigate(['']);
    }

    @Action(UserActions.ExportUser)
    exportUser(ctx: StateContext<UserStateModel>) {
        return this.authApi.authControllerGetExport().pipe(
            tap((blob) =>
                ctx.dispatch(new UserActions.ExportUserSuccess(blob)),
            ),
            catchError((error) => {
                this.snack.show('Could not export user: ' + error.error);
                return [];
            }),
        );
    }

    @Action(UserActions.ExportUserSuccess)
    exportUserSuccess(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _ctx: StateContext<UserStateModel>,
        action: UserActions.ExportUserSuccess,
    ) {
        const element = document.createElement('a');
        element.setAttribute(
            'href',
            'data:text/plain;charset=utf-8,' +
                encodeURIComponent(JSON.stringify(action.data, undefined, 2)),
        );
        element.setAttribute('download', action.data['name'] + '.json');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    @Action(UserActions.DeleteUser)
    deleteUser(ctx: StateContext<UserStateModel>) {
        return this.authApi
            .authControllerDeleteProfile()
            .pipe(tap(() => ctx.dispatch(new UserActions.DeleteUserSuccess())));
    }

    @Action(UserActions.DeleteUserSuccess)
    deleteUserSuccess(ctx: StateContext<UserStateModel>) {
        ctx.patchState({
            currentUser: undefined,
        });
        this.snack.show('Account deleted successfully.');
        this.router.navigate(['']);
    }

    @Action(UserActions.LoadUserFlags)
    loadUserFlags(ctx: StateContext<UserStateModel>) {
        return this.userApi
            .usersControllerGetUserFlags()
            .pipe(
                tap((flags) =>
                    ctx.dispatch(new UserActions.LoadUserFlagsSuccess(flags)),
                ),
            );
    }

    @Action(UserActions.LoadUserFlagsSuccess)
    loadUserFlagsSuccess(
        ctx: StateContext<UserStateModel>,
        action: UserActions.LoadUserFlagsSuccess,
    ) {
        ctx.patchState({
            flags: action.flags,
        });
    }

    @Action(UserActions.ChangeVisibility)
    changeVisibility(
        ctx: StateContext<UserStateModel>,
        action: UserActions.ChangeVisibility,
    ) {
        return this.userApi
            .usersControllerPatchUserFlags({
                public: action.visibility,
            } as UserFlagsPatchDto)
            .pipe(
                tap((flags) =>
                    ctx.dispatch(
                        new UserActions.ChangeInfoVisibilitySuccess(flags),
                    ),
                ),
            );
    }

    @Action(UserActions.ChangeInfoVisibilitySuccess)
    changeVisibilitySuccess(
        ctx: StateContext<UserStateModel>,
        action: UserActions.ChangeInfoVisibilitySuccess,
    ) {
        this.snack.show('Visibility changed successfully');
        ctx.patchState({
            flags: action.flags,
        });
    }

    @Action(UserActions.ChangePassword)
    changePassword(
        ctx: StateContext<UserStateModel>,
        action: UserActions.ChangePassword,
    ) {
        return this.authApi.authControllerChangePassword(action.password).pipe(
            tap(() => ctx.dispatch(new UserActions.ChangePasswordSuccess())),
            catchError((error) =>
                ctx.dispatch(
                    new UserActions.ChangePasswordError(error.error.message),
                ),
            ),
        );
    }

    @Action(UserActions.ChangePasswordSuccess)
    changePasswordSuccess() {
        this.snack.show('Password changed successfully');
    }

    @Action(UserActions.ChangePasswordError)
    changePasswordError() {
        this.snack.show(
            'Could not change password, please check your input and try again.',
        );
    }

    @Action(UserActions.LoadAllSessions)
    loadAllSessions(ctx: StateContext<UserStateModel>) {
        return this.authApi
            .authControllerGetSessions()
            .pipe(
                tap((sessions) =>
                    ctx.dispatch(
                        new UserActions.LoadAllSessionsSuccess(
                            sessions.sessions,
                        ),
                    ),
                ),
            );
    }

    @Action(UserActions.LoadAllSessionsSuccess)
    loadAllSessionsSuccess(
        ctx: StateContext<UserStateModel>,
        action: UserActions.LoadAllSessionsSuccess,
    ) {
        ctx.patchState({
            sessions: action.sessions,
        });
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

    @Selector()
    static signInError(state: UserStateModel): string | undefined {
        return state.signin.error;
    }

    @Selector()
    static requestPasswordResetInProgress(state: UserStateModel): boolean {
        return state.requestPasswordReset.loading;
    }

    @Selector()
    static requestPasswordResetSuccess(
        state: UserStateModel,
    ): boolean | undefined {
        return state.requestPasswordReset.success;
    }

    @Selector()
    static requestPasswordResetError(
        state: UserStateModel,
    ): string | undefined {
        return state.requestPasswordReset.error;
    }

    @Selector()
    static resetPasswordInProgress(state: UserStateModel): boolean {
        return state.resetPassword.loading;
    }

    @Selector()
    static resetPasswordSuccess(state: UserStateModel): boolean | undefined {
        return state.resetPassword.success;
    }

    @Selector()
    static resetPasswordError(state: UserStateModel): string | undefined {
        return state.resetPassword.error;
    }

    @Selector()
    static selectUserFlags(state: UserStateModel): UserFlagsDto | undefined {
        return state.flags;
    }

    @Selector()
    static session(state: UserStateModel): SessionDto | undefined {
        return state.session;
    }

    @Selector()
    static sessions(state: UserStateModel): SessionDto[] | undefined {
        return state.sessions;
    }

    static user(name: string) {
        return createSelector(
            [UserState],
            (state: UserStateModel): BasicUserDto | undefined => {
                return state.otherUsersMap[name.toLowerCase()];
            },
        );
    }
}
