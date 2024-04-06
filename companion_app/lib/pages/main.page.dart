import 'package:companion_app/api/api.dart';
import 'package:companion_app/api/auth.api.dart';
import 'package:companion_app/pages/home.page.dart';
import 'package:companion_app/pages/init.page.dart';
import 'package:companion_app/pages/login.page.dart';
import 'package:companion_app/pages/scan.page.dart';
import 'package:companion_app/state/main.state.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

enum Context { login, scan, home, init }

class MainPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var mainState = context.watch<MainState>();
    var showLogout = mainState.currentContext != Context.login &&
        mainState.currentContext != Context.init;

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
      case Context.scan:
        page = const ScanPage();
        break;
      default:
        throw UnimplementedError('no widget for ${mainState.currentContext}');
    }

    return LayoutBuilder(builder: (context, constraints) {
      return Scaffold(
        appBar: AppBar(
          leading: const Icon(CupertinoIcons.book_fill),
          title: Text('Booklify Companion'),
          actions: [
            if (showLogout)
              IconButton(
                icon: const Icon(Icons.logout),
                onPressed: () => onLogoutPressed(context),
              ),
          ],
        ),
        body: SafeArea(child: page),
      );
    });
  }

  void onLogoutPressed(BuildContext context) async {
    await logout();
    clearToken();

    var mainState = context.read<MainState>();
    mainState.setContext(Context.login);
  }
}
