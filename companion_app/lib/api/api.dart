import 'dart:convert';

import 'package:companion_app/api/auth.api.dart';
import 'package:dio/dio.dart';
import 'package:booklify_api/booklify_api.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../globals.dart' as globals;

Dio createDio(BaseOptions baseConfiguration) {
  var dio = Dio(baseConfiguration);
  dio.interceptors.addAll([]);

  return dio;
}

BaseOptions createDioOptions(int connectionTimeout, int connectionReadTimeout) {
  return BaseOptions(
    connectTimeout: Duration(seconds: connectionTimeout),
    receiveTimeout: Duration(seconds: connectionReadTimeout),
    validateStatus: (status) => status! < 500,
  );
}

void processToken(String token) async {
  var parts = token.split('.');

  var payload =
      jsonDecode(utf8.decode(base64Decode(base64.normalize(parts[1]))));

  int iat = payload['iat'];
  int exp = payload['exp'];

  int delta = exp - iat;
  int refreshTime = iat + (delta ~/ 2);

  final SharedPreferences kv = await SharedPreferences.getInstance();

  globals.authToken = token;
  kv.setString('authToken', globals.authToken ?? '');

  globals.refreshToken = payload['refreshToken'] ?? '';
  kv.setString('refreshToken', globals.refreshToken ?? '');

  globals.nextRefresh = refreshTime;
  kv.setInt('nextRefresh', globals.nextRefresh);

  globals.sessionId = payload['jti'] ?? '';
  kv.setString('sessionId', globals.sessionId ?? '');
}

void clearToken() async {
  final kv = await SharedPreferences.getInstance();

  globals.authToken = '';
  kv.setString('authToken', '');

  globals.refreshToken = '';
  kv.setString('refreshToken', '');

  globals.nextRefresh = 0;
  kv.setInt('nextRefresh', 0);

  globals.sessionId = '';
  kv.setString('sessionId', '');
}

Future<String> getToken() async {
  await init();

  if (globals.authToken!.isEmpty) return '';

  final currentTime = DateTime.now().millisecondsSinceEpoch ~/ 1000;
  if (currentTime < globals.nextRefresh) {
    return globals.authToken!;
  }

  return await _refreshToken();
}

Future<String> _refreshToken() async {
  UserTokenDto? token = null;
  if (globals.refreshToken!.isEmpty) {
    token = await refreshWithAccessToken(globals.authToken!);
  } else {
    token = await refreshWithRefreshToken(
        globals.refreshToken!, globals.sessionId!);
  }

  if (token == null) {
    clearToken();
    return '';
  }

  processToken(token.accessToken);

  return token.accessToken;
}

Future init() async {
  final SharedPreferences kv = await SharedPreferences.getInstance();

  globals.authToken = kv.getString('authToken') ?? '';
  globals.refreshToken = kv.getString('refreshToken') ?? '';
  globals.nextRefresh = kv.getInt('nextRefresh') ?? 0;
  globals.sessionId = kv.getString('sessionId') ?? '';
  globals.baseUrl = kv.getString('baseUrl') ?? 'https://api.booklify.me';
  kv.setString('baseUrl', globals.baseUrl);
}

BooklifyApi createApiInstance() {
  final options = createDioOptions(10, 30);
  final dio = createDio(options);

  dio.interceptors.add(LogInterceptor());
  dio.interceptors.add(InterceptorsWrapper(
    onRequest: (options, handler) async {
      await init();

      String token = globals.authToken ?? '';
      options.baseUrl = globals.baseUrl;

      if (!(options.uri.path.contains('auth/') &&
          !options.uri.path.contains('session'))) {
        token = await getToken();
      }

      options.headers.addEntries([
        MapEntry('Accept', 'application/json'),
        MapEntry('Authorization', 'Bearer $token'),
      ]);

      handler.next(options);
    },
  ));
  return BooklifyApi(dio: dio);
}
