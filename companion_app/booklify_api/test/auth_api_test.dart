import 'package:test/test.dart';
import 'package:booklify_api/booklify_api.dart';

/// tests for AuthApi
void main() {
  final instance = BooklifyApi().getAuthApi();

  group(AuthApi, () {
    //Future authControllerChangePassword(ChangePasswordDto changePasswordDto) async
    test('test authControllerChangePassword', () async {
      // TODO
    });

    //Future authControllerDeleteProfile() async
    test('test authControllerDeleteProfile', () async {
      // TODO
    });

    //Future authControllerGetExport() async
    test('test authControllerGetExport', () async {
      // TODO
    });

    //Future<UserTokenDto> authControllerGetNewToken() async
    test('test authControllerGetNewToken', () async {
      // TODO
    });

    //Future<UserDto> authControllerGetProfile() async
    test('test authControllerGetProfile', () async {
      // TODO
    });

    //Future<SessionDto> authControllerGetSession() async
    test('test authControllerGetSession', () async {
      // TODO
    });

    //Future<SessionListDto> authControllerGetSessions() async
    test('test authControllerGetSessions', () async {
      // TODO
    });

    //Future<SessionDto> authControllerInvalidateSession(String id) async
    test('test authControllerInvalidateSession', () async {
      // TODO
    });

    //Future<UserTokenDto> authControllerRefreshToken(String token, String sessionId) async
    test('test authControllerRefreshToken', () async {
      // TODO
    });

    //Future<ResetPasswordDto> authControllerRequestResetPassword(ResetPasswordRequestDto resetPasswordRequestDto) async
    test('test authControllerRequestResetPassword', () async {
      // TODO
    });

    //Future authControllerResend(String userId) async
    test('test authControllerResend', () async {
      // TODO
    });

    //Future authControllerResetPassword(NewPasswordDto newPasswordDto) async
    test('test authControllerResetPassword', () async {
      // TODO
    });

    //Future<SignInSuccessDto> authControllerSignIn(SignInDto signInDto) async
    test('test authControllerSignIn', () async {
      // TODO
    });

    //Future authControllerSignOut() async
    test('test authControllerSignOut', () async {
      // TODO
    });

    //Future<UserDto> authControllerSignUp(SignUpDto signUpDto) async
    test('test authControllerSignUp', () async {
      // TODO
    });

    //Future authControllerVerify(String userId, String key, String id) async
    test('test authControllerVerify', () async {
      // TODO
    });
  });
}
