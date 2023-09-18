library auth_api;

import 'dart:io';

import 'package:companion_app/state/auth.state.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

const String _baseUrl = 'https://api.booklify.me/auth';

class TokenDto {
  final String accessToken;

  const TokenDto({
    required this.accessToken,
  });

  factory TokenDto.fromJson(Map<String, dynamic> json) {
    return TokenDto(
      accessToken: json['accessToken'],
    );
  }
}

class SessionDto {
  final String id;
  final String userId;
  final String name;
  final String createdAt;
  final bool permanent;

  const SessionDto({
    required this.id,
    required this.userId,
    required this.name,
    required this.createdAt,
    required this.permanent,
  });

  factory SessionDto.fromJson(Map<String, dynamic> json) {
    return SessionDto(
      id: json['id'],
      userId: json['userId'],
      name: json['name'],
      createdAt: json['createdAt'],
      permanent: json['permanent'],
    );
  }
}

Future<TokenDto> login(String email, String password, bool rememberMe) async {
  final response = await http.post(
    Uri.parse('$_baseUrl/login'),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: jsonEncode(<String, dynamic>{
      'email': email,
      'password': password,
      'permanent': rememberMe,
    }),
  );

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return TokenDto.fromJson(jsonDecode(response.body));
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Invalid credentials');
  }
}

Future<TokenDto?> refreshWithRefreshToken(
    String refreshToken, String sessionId) async {
  final response = await http.get(
    Uri.parse(
        '$_baseUrl/refresh?token=$refreshToken&session_id=$sessionId'),
  );

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return TokenDto.fromJson(jsonDecode(response.body));
  }

  return null;
}

Future<TokenDto?> refreshWithAccessToken(String accessToken) async {
  final response = await http.get(Uri.parse('$_baseUrl/token'), headers: {
    HttpHeaders.authorizationHeader: 'Bearer $accessToken',
  });

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return TokenDto.fromJson(jsonDecode(response.body));
  }

  return null;
}

Future<SessionDto?> getSession(AuthState state) async {
  var accessToken = await state.getToken();

  if (accessToken.isEmpty) return null;

  final response = await http.get(
    Uri.parse('$_baseUrl/session'),
    headers: {
      HttpHeaders.authorizationHeader: 'Bearer $accessToken',
    },
  );

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return SessionDto.fromJson(jsonDecode(response.body));
  }

  return null;
}

Future logout(AuthState state) async {
  var accessToken = await state.getToken();

  if (accessToken.isEmpty) return null;

  await http.post(
    Uri.parse('$_baseUrl/logout'),
    headers: {
      HttpHeaders.authorizationHeader: 'Bearer $accessToken',
    },
  );
}