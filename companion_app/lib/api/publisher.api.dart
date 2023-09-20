library publisher_api;

import 'dart:convert';
import 'dart:io';

import 'package:companion_app/state/auth.state.dart';
import 'package:http/http.dart' as http;

class PublisherDto {
  final String id;
  final String name;

  const PublisherDto({
    required this.id,
    required this.name,
  });

  factory PublisherDto.fromJson(Map<String, dynamic> json) {
    return PublisherDto(
      id: json['id'],
      name: json['name'],
    );
  }
}

const String _baseUrl = 'https://api.booklify.me/publishers';

Future<PublisherDto?> getPublisher(AuthState authState, String id) async {
  var accessToken = await authState.getToken();

  final response = await http.get(Uri.parse('$_baseUrl/$id'), headers: {
    HttpHeaders.authorizationHeader: 'Bearer $accessToken',
  });

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return PublisherDto.fromJson(jsonDecode(response.body));
  }

  return null;
}
