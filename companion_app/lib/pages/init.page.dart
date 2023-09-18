import 'package:companion_app/api/auth.api.dart';
import 'package:companion_app/pages/main.page.dart';
import 'package:companion_app/state/auth.state.dart';
import 'package:companion_app/state/main.state.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class InitPage extends StatefulWidget {
  const InitPage({super.key});

  @override
  State<InitPage> createState() => _InitPageState();
}

class _InitPageState extends State<InitPage> {
  @override
  void initState() {
    super.initState();

    var authState = context.read<AuthState>();
    var mainState = context.read<MainState>();
    getSession(authState).then((value) => {
          if (value == null)
            {mainState.setContext(Context.login)}
          else
            {mainState.setContext(Context.home)}
        });
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: ProgressSpinner(),
    );
  }
}

class ProgressSpinner extends StatefulWidget {
  const ProgressSpinner({super.key});

  @override
  State<ProgressSpinner> createState() => _ProgressSpinnerState();
}

class _ProgressSpinnerState extends State<ProgressSpinner>
    with TickerProviderStateMixin {
  late AnimationController controller;
  @override
  void initState() {
    controller = AnimationController(
      /// [AnimationController]s can be created with `vsync: this` because of
      /// [TickerProviderStateMixin].
      vsync: this,
      duration: const Duration(milliseconds: 500),
    )..addListener(() {
        setState(() {});
      });
    controller.repeat(reverse: false);
    super.initState();
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return CircularProgressIndicator(
      value: controller.value,
    );
  }
}
