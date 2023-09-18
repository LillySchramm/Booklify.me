import 'package:companion_app/api/auth.api.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

class AuthState extends ChangeNotifier {
  String authToken = '';
  String refreshToken = '';
  String sessionId = '';
  int nextRefresh = 0;

  final Future<SharedPreferences> _kv = SharedPreferences.getInstance();

  AuthState() {
    init();
  }

  void processToken(String token) {
    var parts = token.split('.');

    var payload =
        jsonDecode(utf8.decode(base64Decode(base64.normalize(parts[1]))));

    int iat = payload['iat'];
    int exp = payload['exp'];

    int delta = exp - iat;
    int refreshTime = iat + (delta ~/ 2);

    setAuthToken(token);
    setRefreshToken(payload['refreshToken'] ?? '');
    setNextRefresh(refreshTime);
    setSessionId(payload['jti']);
  }

  void clearToken() {
    setAuthToken('');
    setRefreshToken('');
    setNextRefresh(0);
    setSessionId('');
  }

  Future<String> getToken() async {
    await init();

    if (authToken.isEmpty) return '';

    final currentTime = DateTime.now().millisecondsSinceEpoch ~/ 1000;
    if (currentTime < nextRefresh) {
      return authToken;
    }

    return await _refreshToken();
  }

  Future<String> _refreshToken() async {
    TokenDto? token = null;
    if (refreshToken.isEmpty) {
      token = await refreshWithAccessToken(authToken);
    } else {
      token = await refreshWithRefreshToken(refreshToken, sessionId);
    }

    if (token == null) {
      clearToken();
      return '';
    }

    processToken(token.accessToken);

    return token.accessToken;
  }

  Future init() async {
    final SharedPreferences kv = await _kv;

    authToken = kv.getString('authToken') ?? '';
    refreshToken = kv.getString('refreshToken') ?? '';
    nextRefresh = kv.getInt('nextRefresh') ?? 0;
    sessionId = kv.getString('sessionId') ?? '';
  }

  void setAuthToken(String token) async {
    final SharedPreferences kv = await _kv;
    await kv.setString('authToken', token);

    authToken = token;
    notifyListeners();
  }

  void setRefreshToken(String token) async {
    final SharedPreferences kv = await _kv;
    await kv.setString('refreshToken', token);

    refreshToken = token;
    notifyListeners();
  }

  void setNextRefresh(int time) async {
    final SharedPreferences kv = await _kv;
    await kv.setInt('nextRefresh', time);

    nextRefresh = time;
    notifyListeners();
  }

  void setSessionId(String id) async {
    final SharedPreferences kv = await _kv;
    await kv.setString('sessionId', id);

    sessionId = id;
    notifyListeners();
  }
}
