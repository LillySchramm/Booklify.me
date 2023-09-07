import { SignUpDto, UserDto } from 'src/app/api';

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

    export class ResendConfirmation {
        static readonly type = '[User] Resend Confirmation';
    }

    export class ResendConfirmationSuccess {
        static readonly type = '[User] Resend Confirmation Success';
    }
}
