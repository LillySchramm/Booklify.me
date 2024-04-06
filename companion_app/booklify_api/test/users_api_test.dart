import 'package:test/test.dart';
import 'package:booklify_api/booklify_api.dart';

/// tests for UsersApi
void main() {
  final instance = BooklifyApi().getUsersApi();

  group(UsersApi, () {
    //Future<BasicUserDto> usersControllerGetUser(String id, String name) async
    test('test usersControllerGetUser', () async {
      // TODO
    });

    //Future<UserFlagsDto> usersControllerGetUserFlags() async
    test('test usersControllerGetUserFlags', () async {
      // TODO
    });

    //Future<UserFlagsDto> usersControllerPatchUserFlags(UserFlagsPatchDto userFlagsPatchDto) async
    test('test usersControllerPatchUserFlags', () async {
      // TODO
    });
  });
}
