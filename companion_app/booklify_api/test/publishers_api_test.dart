import 'package:test/test.dart';
import 'package:booklify_api/booklify_api.dart';

/// tests for PublishersApi
void main() {
  final instance = BooklifyApi().getPublishersApi();

  group(PublishersApi, () {
    //Future<PublisherDto> publishersControllerGetPublisher(String id) async
    test('test publishersControllerGetPublisher', () async {
      // TODO
    });

    //Future<PublisherListDto> publishersControllerGetPublishers(GetIdListDto getIdListDto) async
    test('test publishersControllerGetPublishers', () async {
      // TODO
    });
  });
}
