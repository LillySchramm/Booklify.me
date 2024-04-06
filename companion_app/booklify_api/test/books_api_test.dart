import 'package:test/test.dart';
import 'package:booklify_api/booklify_api.dart';

/// tests for BooksApi
void main() {
  final instance = BooklifyApi().getBooksApi();

  group(BooksApi, () {
    //Future<BookListDto> booksControllerGetAllOwnedBooks(String id) async
    test('test booksControllerGetAllOwnedBooks', () async {
      // TODO
    });

    //Future<BookDto> booksControllerGetBook(String isbn, { bool skipCrawl }) async
    test('test booksControllerGetBook', () async {
      // TODO
    });

    //Future booksControllerGetBookCover(String id) async
    test('test booksControllerGetBookCover', () async {
      // TODO
    });

    //Future<OwnershipStatusDto> booksControllerGetBookOwnershipStatus(String isbn) async
    test('test booksControllerGetBookOwnershipStatus', () async {
      // TODO
    });

    //Future booksControllerSetBookOwnershipFlags(SetOwnershipFlagsDto setOwnershipFlagsDto) async
    test('test booksControllerSetBookOwnershipFlags', () async {
      // TODO
    });

    //Future<OwnershipStatusDto> booksControllerSetBookOwnershipStatus(String isbn, SetOwnershipStatusDto setOwnershipStatusDto) async
    test('test booksControllerSetBookOwnershipStatus', () async {
      // TODO
    });
  });
}
