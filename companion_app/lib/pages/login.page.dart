import 'package:checkbox_formfield/checkbox_formfield.dart';
import 'package:companion_app/api/auth.api.dart';
import 'package:companion_app/pages/main.page.dart';
import 'package:companion_app/state/auth.state.dart';
import 'package:companion_app/state/main.state.dart';
import 'package:email_validator/email_validator.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(builder: (context, constraints) {
      return Scaffold(
          body: Padding(
        padding: const EdgeInsets.all(20),
        child: LoginForm(),
      ));
    });
  }
}

class LoginForm extends StatefulWidget {
  const LoginForm({super.key});

  @override
  State<LoginForm> createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  var rememberMe = false;

  Future<void> _launchUrl() async {
    final url = Uri.parse('https://booklify.me/login');
    if (!await launchUrl(url)) {
      throw Exception('Could not launch url');
    }
  }

  void onLoginPressed() async {
    var valid = _formKey.currentState!.validate();
    if (!valid) return;

    TokenDto? tokenDto = null;
    try {
      tokenDto = await login(
          emailController.text, passwordController.text, rememberMe);
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text('Invalid credentials'),
        duration: Duration(seconds: 2),
      ));
    }

    var authState = context.read<AuthState>();
    authState.processToken(tokenDto!.accessToken);

    var mainState = context.read<MainState>();
    mainState.setContext(Context.home);

    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      content: Text('Login successful'),
      duration: Duration(seconds: 2),
    ));
  }

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    var authState = context.watch<AuthState>();

    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
              decoration: InputDecoration(
                border: OutlineInputBorder(),
                labelText: 'E-Mail',
              ),
              validator: emailValidator(),
              controller: emailController),
          SizedBox(height: 10),
          TextFormField(
            obscureText: true,
            decoration: InputDecoration(
              border: OutlineInputBorder(),
              labelText: 'Password',
            ),
            validator: passwordValidator(),
            controller: passwordController,
          ),
          SizedBox(height: 10),
          CheckboxListTileFormField(
            title: Text('Remember me'),
            onSaved: (bool? value) {},
            onChanged: (value) => rememberMe = value,
          ),
          SizedBox(height: 10),
          FilledButton.tonalIcon(
              onPressed: onLoginPressed,
              label: const Text('Login'),
              icon: Icon(Icons.login)),
          Expanded(child: SizedBox.shrink()),
          TextButton.icon(
            onPressed: _launchUrl,
            label: const Text('Don\'t have an account? Register here'),
            icon: Icon(Icons.open_in_new),
            style: ButtonStyle(
              iconColor: MaterialStateProperty.all(Colors.black),
              foregroundColor: MaterialStateProperty.all(Colors.black),
            ),
          ),
        ],
      ),
    );
  }
}

String? Function(String?)? emailValidator() {
  return (String? value) {
    if (value == null || value.isEmpty) {
      return 'Please enter your e-mail address';
    }

    if (EmailValidator.validate(value) == false) {
      return 'Please enter a valid e-mail address';
    }

    return null;
  };
}

String? Function(String?)? passwordValidator() {
  return (String? value) {
    if (value == null || value.isEmpty) {
      return 'Please enter your password';
    }

    return null;
  };
}
