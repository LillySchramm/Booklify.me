import {
    BasicUserDto,
    ChangePasswordDto,
    NewPasswordDto,
    SessionDto,
    SignInDto,
    SignInSuccessDto,
    SignUpDto,
    UserDto,
    UserFlagsDto,
} from 'src/app/api';

export interface EMailFlags {
    changelogNotificationEnabled?: boolean;
}

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

    export class LoadUserByNickname {
        static readonly type = '[User] Load User By Nickname';
        constructor(public nickname: string) {}
    }

    export class LoadUserByNicknameSuccess {
        static readonly type = '[User] Load User By Nickname Success';
        constructor(public user: BasicUserDto) {}
    }

    export class LoadUserByNicknameError {
        static readonly type = '[User] Load User By Nickname Error';
        constructor(public error: string) {}
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

    export class ExportUser {
        static readonly type = '[User] Export User';
    }

    export class ExportUserSuccess {
        static readonly type = '[User] Export User Success';
        constructor(public data: any) {}
    }

    export class DeleteUser {
        static readonly type = '[User] Delete User';
    }

    export class DeleteUserSuccess {
        static readonly type = '[User] Delete User Success';
    }

    export class LoadUserFlags {
        static readonly type = '[User] Load Flags';
    }

    export class LoadUserFlagsSuccess {
        static readonly type = '[User] Load Flags Success';
        constructor(public flags: UserFlagsDto) {}
    }

    export class ChangeVisibility {
        static readonly type = '[User] Change Visibility';
        constructor(public visibility: boolean) {}
    }

    export class ChangeEmailFlags {
        static readonly type = '[User] Change Email Flags';
        constructor(public flags: EMailFlags) {}
    }

    export class ChangeEmailFlagsSuccess {
        static readonly type = '[User] Change Email Flags Success';
        constructor(public flags: UserFlagsDto) {}
    }

    export class ChangeInfoVisibilitySuccess {
        static readonly type = '[User] Change Visibility Success';
        constructor(public flags: UserFlagsDto) {}
    }

    export class ChangePassword {
        static readonly type = '[User] Change Password';
        constructor(public password: ChangePasswordDto) {}
    }

    export class ChangePasswordSuccess {
        static readonly type = '[User] Change Password Success';
    }

    export class ChangePasswordError {
        static readonly type = '[User] Change Password Error';
        constructor(public error: string) {}
    }

    export class LoadAllSessions {
        static readonly type = '[User] Load All Sessions';
    }

    export class LoadAllSessionsSuccess {
        static readonly type = '[User] Load All Sessions Success';
        constructor(public sessions: SessionDto[]) {}
    }

    export class InvalidateSession {
        static readonly type = '[User] Invalidate Session';
        constructor(public sessionId: string) {}
    }

    export class InvalidateSessionSuccess {
        static readonly type = '[User] Invalidate Session Success';
    }
}
