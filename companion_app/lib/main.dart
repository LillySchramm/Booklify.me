import 'dart:typed_data';

import 'package:companion_app/pages/main.page.dart';
import 'package:companion_app/state/auth.state.dart';
import 'package:companion_app/state/main.state.dart';
import 'package:companion_app/state/scanner.state.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => MainState(),
      child: ChangeNotifierProvider(
        create: (context) => AuthState(),
        child: ChangeNotifierProvider(
          create: (context) => ScannerState(),
          child: MaterialApp(
            title: 'Booklify Companion',
            theme: ThemeData(
              useMaterial3: true,
              colorScheme: ColorScheme.fromSeed(seedColor: Colors.pink),
            ),
            home: MainPage(),
          ),
        ),
      ),
    );
  }
}
