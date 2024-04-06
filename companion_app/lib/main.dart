import 'package:companion_app/api/api.dart';

import 'globals.dart' as globals;

import 'package:companion_app/pages/main.page.dart';
import 'package:companion_app/state/main.state.dart';
import 'package:companion_app/state/scanner.state.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  globals.api = createApiInstance();

  runApp(BooklifyCompanion());
}

class BooklifyCompanion extends StatelessWidget {
  const BooklifyCompanion({super.key});

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => MainState(),
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
    );
  }
}
