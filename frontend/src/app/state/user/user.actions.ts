import { SignInDto, SignInSuccessDto, SignUpDto, UserDto } from 'src/app/api';

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
}
