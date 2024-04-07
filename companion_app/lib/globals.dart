library companion_app.globals;

import 'package:booklify_api/booklify_api.dart';

BooklifyApi? api;

String? authToken = '';
String? refreshToken = '';
int nextRefresh = 0;
String? sessionId = '';

String baseUrl = 'https://api.booklify.me';
