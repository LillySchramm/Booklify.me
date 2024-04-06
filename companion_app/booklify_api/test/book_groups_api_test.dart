import 'package:test/test.dart';
import 'package:booklify_api/booklify_api.dart';

/// tests for BookGroupsApi
void main() {
  final instance = BooklifyApi().getBookGroupsApi();

  group(BookGroupsApi, () {
    //Future<BookGroupDto> bookGroupsControllerCreateBookGroup(BookGroupPostDto bookGroupPostDto) async
    test('test bookGroupsControllerCreateBookGroup', () async {
      // TODO
    });

    //Future bookGroupsControllerDeleteBookGroup(String id) async
    test('test bookGroupsControllerDeleteBookGroup', () async {
      // TODO
    });

    //Future<BookGroupListDto> bookGroupsControllerGetAllBookGroups(String id) async
    test('test bookGroupsControllerGetAllBookGroups', () async {
      // TODO
    });

    //Future<BookGroupDto> bookGroupsControllerUpdateBookGroup(String id, BookGroupPatchDto bookGroupPatchDto) async
    test('test bookGroupsControllerUpdateBookGroup', () async {
      // TODO
    });
  });
}
