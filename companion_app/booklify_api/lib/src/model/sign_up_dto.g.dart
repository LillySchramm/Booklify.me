// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'sign_up_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$SignUpDto extends SignUpDto {
  @override
  final String name;
  @override
  final String email;
  @override
  final String password;
  @override
  final String recaptchaToken;
  @override
  final bool? agreedTos;
  @override
  final bool? agreedPrivacy;

  factory _$SignUpDto([void Function(SignUpDtoBuilder)? updates]) =>
      (new SignUpDtoBuilder()..update(updates))._build();

  _$SignUpDto._(
      {required this.name,
      required this.email,
      required this.password,
      required this.recaptchaToken,
      this.agreedTos,
      this.agreedPrivacy})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(name, r'SignUpDto', 'name');
    BuiltValueNullFieldError.checkNotNull(email, r'SignUpDto', 'email');
    BuiltValueNullFieldError.checkNotNull(password, r'SignUpDto', 'password');
    BuiltValueNullFieldError.checkNotNull(
        recaptchaToken, r'SignUpDto', 'recaptchaToken');
  }

  @override
  SignUpDto rebuild(void Function(SignUpDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  SignUpDtoBuilder toBuilder() => new SignUpDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is SignUpDto &&
        name == other.name &&
        email == other.email &&
        password == other.password &&
        recaptchaToken == other.recaptchaToken &&
        agreedTos == other.agreedTos &&
        agreedPrivacy == other.agreedPrivacy;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, name.hashCode);
    _$hash = $jc(_$hash, email.hashCode);
    _$hash = $jc(_$hash, password.hashCode);
    _$hash = $jc(_$hash, recaptchaToken.hashCode);
    _$hash = $jc(_$hash, agreedTos.hashCode);
    _$hash = $jc(_$hash, agreedPrivacy.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'SignUpDto')
          ..add('name', name)
          ..add('email', email)
          ..add('password', password)
          ..add('recaptchaToken', recaptchaToken)
          ..add('agreedTos', agreedTos)
          ..add('agreedPrivacy', agreedPrivacy))
        .toString();
  }
}

class SignUpDtoBuilder implements Builder<SignUpDto, SignUpDtoBuilder> {
  _$SignUpDto? _$v;

  String? _name;
  String? get name => _$this._name;
  set name(String? name) => _$this._name = name;

  String? _email;
  String? get email => _$this._email;
  set email(String? email) => _$this._email = email;

  String? _password;
  String? get password => _$this._password;
  set password(String? password) => _$this._password = password;

  String? _recaptchaToken;
  String? get recaptchaToken => _$this._recaptchaToken;
  set recaptchaToken(String? recaptchaToken) =>
      _$this._recaptchaToken = recaptchaToken;

  bool? _agreedTos;
  bool? get agreedTos => _$this._agreedTos;
  set agreedTos(bool? agreedTos) => _$this._agreedTos = agreedTos;

  bool? _agreedPrivacy;
  bool? get agreedPrivacy => _$this._agreedPrivacy;
  set agreedPrivacy(bool? agreedPrivacy) =>
      _$this._agreedPrivacy = agreedPrivacy;

  SignUpDtoBuilder() {
    SignUpDto._defaults(this);
  }

  SignUpDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _name = $v.name;
      _email = $v.email;
      _password = $v.password;
      _recaptchaToken = $v.recaptchaToken;
      _agreedTos = $v.agreedTos;
      _agreedPrivacy = $v.agreedPrivacy;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(SignUpDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$SignUpDto;
  }

  @override
  void update(void Function(SignUpDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  SignUpDto build() => _build();

  _$SignUpDto _build() {
    final _$result = _$v ??
        new _$SignUpDto._(
            name: BuiltValueNullFieldError.checkNotNull(
                name, r'SignUpDto', 'name'),
            email: BuiltValueNullFieldError.checkNotNull(
                email, r'SignUpDto', 'email'),
            password: BuiltValueNullFieldError.checkNotNull(
                password, r'SignUpDto', 'password'),
            recaptchaToken: BuiltValueNullFieldError.checkNotNull(
                recaptchaToken, r'SignUpDto', 'recaptchaToken'),
            agreedTos: agreedTos,
            agreedPrivacy: agreedPrivacy);
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
