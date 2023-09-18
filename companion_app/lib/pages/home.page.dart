import 'package:companion_app/api/auth.api.dart';
import 'package:companion_app/pages/main.page.dart';
import 'package:companion_app/state/auth.state.dart';
import 'package:companion_app/state/main.state.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Center(
      child: FilledButton.tonalIcon(
          onPressed: onLogoutPressed,
          label: const Text('Logout'),
          icon: Icon(Icons.logout)),
    ));
  }

  void onLogoutPressed() async {
    var authState = context.read<AuthState>();
    await logout(authState);
    authState.clearToken();

    var mainState = context.read<MainState>();
    mainState.setContext(Context.login);
  }
}
