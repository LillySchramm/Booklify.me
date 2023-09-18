import 'package:companion_app/pages/main.page.dart';
import 'package:flutter/material.dart';

class MainState extends ChangeNotifier {
  Context currentContext = Context.init;

  void setContext(Context context) {
    currentContext = context;
    notifyListeners();
  }
}
