import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs';
import { AuthService, UserDto } from 'src/app/api';
import { UserActions } from './user.actions';

interface UserStateModel {
    currentUser?: UserDto;
    signup: {
        loading: boolean;
        success?: boolean;
        error?: string;
    };
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        signup: {
            loading: false,
        },
    },
})
@Injectable()
export class UserState {
    constructor(private authApi: AuthService) {}

    @Action(UserActions.SignUp)
    loadUser(ctx: StateContext<UserStateModel>, action: UserActions.SignUp) {
        ctx.patchState({
            signup: {
                loading: true,
            },
        });

        return this.authApi.authControllerSignUp(action.user).pipe(
            tap((user) => ctx.dispatch(new UserActions.SignUpSuccess(user))),
            catchError((error) =>
                ctx.dispatch(new UserActions.SignUpError(error)),
            ),
        );
    }

    @Action(UserActions.SignUpSuccess)
    loadedUser(
        ctx: StateContext<UserStateModel>,
        action: UserActions.SignUpSuccess,
    ) {
        ctx.patchState({
            signup: {
                loading: false,
                success: true,
            },
            currentUser: action.user,
        });
    }

    @Action(UserActions.SignUpError)
    loadedUserError(
        ctx: StateContext<UserStateModel>,
        action: UserActions.SignUpError,
    ) {
        ctx.patchState({
            signup: {
                loading: false,
                error: action.error,
            },
        });
    }

    @Selector()
    static currentUser(state: UserStateModel) {
        return state.currentUser;
    }

    @Selector()
    static signUpInProgress(state: UserStateModel): boolean {
        return state.signup.loading;
    }

    @Selector()
    static signUpDisabled(state: UserStateModel): boolean {
        return state.signup.loading || !!state.currentUser;
    }
}
