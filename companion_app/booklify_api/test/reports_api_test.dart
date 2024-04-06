import 'package:test/test.dart';
import 'package:booklify_api/booklify_api.dart';

/// tests for ReportsApi
void main() {
  final instance = BooklifyApi().getReportsApi();

  group(ReportsApi, () {
    //Future reportsControllerBanUser(String key, String id) async
    test('test reportsControllerBanUser', () async {
      // TODO
    });

    //Future reportsControllerCreateReport(CreateReportDto createReportDto) async
    test('test reportsControllerCreateReport', () async {
      // TODO
    });

    //Future reportsControllerDismissReport(String key, String id) async
    test('test reportsControllerDismissReport', () async {
      // TODO
    });
  });
}
