library publisher_api;

import 'package:booklify_api/booklify_api.dart';
import '../globals.dart' as globals;

Future<PublisherDto?> getPublisher(String id) async {
  final response = await globals.api!
      .getPublishersApi()
      .publishersControllerGetPublisher(id: id);

  if (response.statusCode == 200) {
    // If the server did return a 200 OK response,
    // then parse the JSON.
    return response.data;
  }

  return null;
}
