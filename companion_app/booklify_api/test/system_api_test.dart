import 'package:test/test.dart';
import 'package:booklify_api/booklify_api.dart';

/// tests for SystemApi
void main() {
  final instance = BooklifyApi().getSystemApi();

  group(SystemApi, () {
    //Future<SystemHealthDto> systemControllerGetSystemHealth() async
    test('test systemControllerGetSystemHealth', () async {
      // TODO
    });

    //Future<SystemInfoDto> systemControllerGetSystemInfo() async
    test('test systemControllerGetSystemInfo', () async {
      // TODO
    });

    //Future<SystemInfoDto> systemControllerReset() async
    test('test systemControllerReset', () async {
      // TODO
    });
  });
}
