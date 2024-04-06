import 'package:test/test.dart';
import 'package:booklify_api/booklify_api.dart';

/// tests for AuthorsApi
void main() {
  final instance = BooklifyApi().getAuthorsApi();

  group(AuthorsApi, () {
    //Future<AuthorDto> authorsControllerGetAuthor(String id) async
    test('test authorsControllerGetAuthor', () async {
      // TODO
    });

    //Future<AuthorListDto> authorsControllerGetAuthors(GetIdListDto getIdListDto) async
    test('test authorsControllerGetAuthors', () async {
      // TODO
    });
  });
}
