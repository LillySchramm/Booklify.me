library author_api;

import 'package:booklify_api/booklify_api.dart';

import '../globals.dart' as globals;

Future<AuthorDto?> getAuthor(String id) async {
  final response =
      await globals.api!.getAuthorsApi().authorsControllerGetAuthor(id: id);

  if (response.statusCode == 200) {
    return response.data;
  }

  return null;
}
