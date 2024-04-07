library auth_api;

import 'package:booklify_api/booklify_api.dart';
import '../globals.dart' as globals;

Future<SignInSuccessDto> login(
    String email, String password, bool rememberMe) async {
  final response = await globals.api!.getAuthApi().authControllerSignIn(
        signInDto: SignInDto((b) => b
          ..email = email
          ..password = password
          ..permanent = rememberMe),
      );
  if (response.statusCode == 200) {
    return response.data!;
  } else {
    // If the server did not return a 200 OK response,
    // then throw an exception.
    throw Exception('Invalid credentials');
  }
}

Future<UserTokenDto?> refreshWithRefreshToken(
    String refreshToken, String sessionId) async {
  try {
    final response = await globals.api!
        .getAuthApi()
        .authControllerRefreshToken(token: refreshToken, sessionId: sessionId);

    if (response.statusCode == 200) {
      return response.data;
    }
  } catch (e) {
    return null;
  }

  return null;
}

Future<UserTokenDto?> refreshWithAccessToken(String accessToken) async {
  try {
    final response =
        await globals.api!.getAuthApi().authControllerGetNewToken();

    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then parse the JSON.
      return response.data;
    }
  } catch (e) {
    return null;
  }

  return null;
}

Future<SessionDto?> getSession() async {
  try {
    final response = await globals.api!.getAuthApi().authControllerGetSession();
    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then parse the JSON.
      return response.data;
    }
  } catch (e) {
    return null;
  }

  return null;
}

Future logout() async {
  try {
    final response = await globals.api!.getAuthApi().authControllerSignOut();

    if (response.statusCode == 200) {
      return response.data;
    }

    return null;
  } catch (e) {
    return null;
  }
}
