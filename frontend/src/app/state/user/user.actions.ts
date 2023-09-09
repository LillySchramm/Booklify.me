import {
    NewPasswordDto,
    SessionDto,
    SignInDto,
    SignInSuccessDto,
    SignUpDto,
    UserDto,
} from 'src/app/api';

export namespace UserActions {
    export class SignUp {
        static readonly type = '[User] Sign Up';
        constructor(public user: SignUpDto) {}
    }

    export class SignUpSuccess {
        static readonly type = '[User] Sign Up Success';
        constructor(public user: UserDto) {}
    }

    export class SignUpError {
        static readonly type = '[User] Sign Up Error';
        constructor(public error: string) {}
    }

    export class SignIn {
        static readonly type = '[User] Sign In';
        constructor(public user: SignInDto) {}
    }

    export class SignInSuccess {
        static readonly type = '[User] Sign In Success';
        constructor(public response: SignInSuccessDto) {}
    }

    export class SignInError {
        static readonly type = '[User] Sign In Error';
        constructor(public error: string) {}
    }

    export class ResendConfirmation {
        static readonly type = '[User] Resend Confirmation';
    }

    export class ResendConfirmationSuccess {
        static readonly type = '[User] Resend Confirmation Success';
    }

    export class VerifyEmail {
        static readonly type = '[User] Verify Email';
        constructor(
            public userId: string,
            public key: string,
            public id: string,
        ) {}
    }

    export class VerifyEmailSuccess {
        static readonly type = '[User] Verify Email Success';
    }

    export class VerifyEmailError {
        static readonly type = '[User] Verify Email Error';
    }

    export class NewSession {
        static readonly type = '[User] Session';
        constructor(public session: SessionDto) {}
    }

    export class LoadUser {
        static readonly type = '[User] Load User';
    }

    export class LoadUserSuccess {
        static readonly type = '[User] Load User Success';
        constructor(public user: UserDto) {}
    }

    export class LogOut {
        static readonly type = '[User] Log Out';
    }

    export class LogOutSuccess {
        static readonly type = '[User] Log Out Success';
    }

    export class RequestReset {
        static readonly type = '[User] Request Reset';
        constructor(public email: string) {}
    }

    export class RequestResetSuccess {
        static readonly type = '[User] Request Reset Success';
    }

    export class RequestResetError {
        static readonly type = '[User] Request Reset Error';
        constructor(public error: string) {}
    }

    export class ClearResetRequest {
        static readonly type = '[User] Clear Reset Request';
    }

    export class ResetPassword {
        static readonly type = '[User] Reset Password';
        constructor(public reset: NewPasswordDto) {}
    }

    export class ResetPasswordSuccess {
        static readonly type = '[User] Reset Password Success';
    }

    export class ResetPasswordError {
        static readonly type = '[User] Reset Password Error';
        constructor(public error: string) {}
    }
}
