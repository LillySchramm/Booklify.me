library book_api;

import 'dart:convert';
import 'dart:io';

import 'package:companion_app/state/auth.state.dart';
import 'package:http/http.dart' as http;

class AuthorIdDto {
  final String id;

  const AuthorIdDto({
    required this.id,
  });

  factory AuthorIdDto.fromJson(Map<String, dynamic> json) {
    return AuthorIdDto(
      id: json['id'],
    );
  }
}

class OwnershipStatusDto {
  final String status;

  const OwnershipStatusDto({
    required this.status,
  });

  factory OwnershipStatusDto.fromJson(Map<String, dynamic> json) {
    return OwnershipStatusDto(
      status: json['status'],
    );
  }
}

class BookDto {
  final String isbn;
  final String? title;
  final String? subtitle;
  final String? description;
  final String publisher;
  final String? cover;
  final List<AuthorIdDto> authors;
  final String? groupId;

  const BookDto({
    required this.isbn,
    required this.title,
    required this.subtitle,
    required this.description,
    required this.publisher,
    required this.authors,
    required this.cover,
    required this.groupId,
  });

  factory BookDto.fromJson(Map<String, dynamic> json) {
    var authors = json['authors'] as List<dynamic>;
    var authorDtos = authors
        .map<AuthorIdDto>((author) => AuthorIdDto.fromJson(author))
        .toList();

    return BookDto(
      isbn: json['isbn'],
      title: json['title'],
      subtitle: json['subtitle'],
      description: json['description'],
      publisher: json['publisherId'],
      authors: authorDtos,
      cover: json['bookCoverId'],
      groupId: json['groupId'],
    );
  }
}

const String _baseUrl = 'https://api.booklify.me/books';

Future<BookDto?> getBook(AuthState authState, String isbn) async {
  var accessToken = await authState.getToken();

  final response = await http.get(Uri.parse('$_baseUrl/$isbn'), headers: {
    HttpHeaders.authorizationHeader: 'Bearer $accessToken',
  });

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return BookDto.fromJson(jsonDecode(response.body));
  }

  return null;
}

Future<bool> isBookKnown(AuthState authState, String isbn) async {
  var accessToken = await authState.getToken();

  final response =
      await http.get(Uri.parse('$_baseUrl/$isbn?skipCrawl=true'), headers: {
    HttpHeaders.authorizationHeader: 'Bearer $accessToken',
  });

  return response.statusCode == 200;
}

Future<OwnershipStatusDto?> getBookOwnershipStatus(
    AuthState authState, String isbn) async {
  var accessToken = await authState.getToken();

  final response =
      await http.get(Uri.parse('$_baseUrl/$isbn/status'), headers: {
    HttpHeaders.authorizationHeader: 'Bearer $accessToken',
  });

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return OwnershipStatusDto.fromJson(jsonDecode(response.body));
  }

  return null;
}

Future setOwnershipStatus(
    AuthState authState, BookDto bookDto, String ownershipStatus) async {
  var accessToken = await authState.getToken();

  final response = await http.post(
    Uri.parse('$_baseUrl/${bookDto.isbn}/status'),
    headers: {
      HttpHeaders.authorizationHeader: 'Bearer $accessToken',
      HttpHeaders.contentTypeHeader: 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, dynamic>{
      'status': ownershipStatus,
      'bookGroupId': bookDto.groupId,
    }),
  );
}
