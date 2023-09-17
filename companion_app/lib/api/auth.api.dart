library auth_api;

import 'package:http/http.dart' as http;
import 'dart:convert';

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

Future<TokenDto> login(String email, String password, bool rememberMe) async {
  final response = await http.post(
    Uri.parse('https://api.booklify.me/auth/login'),
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
