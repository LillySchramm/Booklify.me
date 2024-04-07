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
import 'package:shared_preferences/shared_preferences.dart';
import '../globals.dart' as globals;

enum Context { login, scan, home, init }

class MainPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var mainState = context.watch<MainState>();
    var showLogout = mainState.currentContext != Context.login &&
        mainState.currentContext != Context.init;
    var showConfig = mainState.currentContext == Context.login;

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
            if (showConfig)
              IconButton(
                onPressed: () => onSettingsPressed(context),
                icon: Icon(Icons.settings),
              )
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

  void setBaseUrl(String baseUrl) async {
    globals.baseUrl = baseUrl;

    final kv = await SharedPreferences.getInstance();
    kv.setString('baseUrl', baseUrl);
  }

  void onSettingsPressed(BuildContext context) {
    var base = globals.baseUrl;
    var controller = TextEditingController(text: base);

    showDialog<String>(
      context: context,
      builder: (BuildContext context) => AlertDialog(
        title: const Text('Settings'),
        content: Column(
          children: [
            const Text(
                'If you self-host, you can change the used instance here.'),
            TextFormField(
              decoration: InputDecoration(
                labelText: 'Instance',
                hintText: 'https://api.booklify.me',
              ),
              controller: controller,
              onChanged: (value) => globals.baseUrl = value,
            ),
          ],
        ),
        actions: <Widget>[
          TextButton(
              onPressed: () => {
                    controller.text = 'https://api.booklify.me',
                    globals.baseUrl = 'https://api.booklify.me'
                  },
              child: const Text("Reset")),
          TextButton(
            onPressed: () =>
                {setBaseUrl(controller.text), Navigator.pop(context, 'OK')},
            child: const Text('OK'),
          ),
        ],
      ),
    );
  }
}
