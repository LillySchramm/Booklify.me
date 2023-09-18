import 'package:companion_app/pages/home.page.dart';
import 'package:companion_app/pages/init.page.dart';
import 'package:companion_app/pages/login.page.dart';
import 'package:companion_app/state/main.state.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

enum Context { login, scan, home, init }

class MainPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var mainState = context.watch<MainState>();

    Widget page;
    switch (mainState.currentContext) {
      case Context.login:
        page = LoginPage();
        break;
      case Context.init:
        page = InitPage();
        break;
      case Context.home:
        page = const HomePage();
        break;
      default:
        throw UnimplementedError('no widget for ${mainState.currentContext}');
    }

    return LayoutBuilder(builder: (context, constraints) {
      return Scaffold(
        appBar: AppBar(
          title: Text('Booklify Companion'),
        ),
        body: SafeArea(child: page),
      );
    });
  }
}
