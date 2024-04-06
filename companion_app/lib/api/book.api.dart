library book_api;

import 'package:booklify_api/booklify_api.dart';
import '../globals.dart' as globals;

Future<BookDto?> getBook(String isbn) async {
  final response =
      await globals.api!.getBooksApi().booksControllerGetBook(isbn: isbn);

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return response.data;
  }

  return null;
}

Future<bool> isBookKnown(String isbn) async {
  final response = await globals.api!
      .getBooksApi()
      .booksControllerGetBook(isbn: isbn, skipCrawl: true);

  return response.statusCode == 200;
}

Future<OwnershipStatusDto?> getBookOwnershipStatus(String isbn) async {
  final response = await globals.api!
      .getBooksApi()
      .booksControllerGetBookOwnershipStatus(isbn: isbn);

  if (response.statusCode == 200) {
    return response.data;
  }

  return null;
}

Future setOwnershipStatus(BookDto bookDto,
    SetOwnershipStatusDtoStatusEnum? ownershipStatus, bool hidden) async {
  final dto = SetOwnershipStatusDto(
    (b) => b
      ..status = ownershipStatus
      ..bookGroupId = bookDto.groupId
      ..hidden = hidden,
  );

  await globals.api!.getBooksApi().booksControllerSetBookOwnershipStatus(
      isbn: bookDto.isbn, setOwnershipStatusDto: dto);
}
