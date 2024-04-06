// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'sign_in_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$SignInDto extends SignInDto {
  @override
  final String email;
  @override
  final String password;
  @override
  final bool permanent;

  factory _$SignInDto([void Function(SignInDtoBuilder)? updates]) =>
      (new SignInDtoBuilder()..update(updates))._build();

  _$SignInDto._(
      {required this.email, required this.password, required this.permanent})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(email, r'SignInDto', 'email');
    BuiltValueNullFieldError.checkNotNull(password, r'SignInDto', 'password');
    BuiltValueNullFieldError.checkNotNull(permanent, r'SignInDto', 'permanent');
  }

  @override
  SignInDto rebuild(void Function(SignInDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  SignInDtoBuilder toBuilder() => new SignInDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is SignInDto &&
        email == other.email &&
        password == other.password &&
        permanent == other.permanent;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, email.hashCode);
    _$hash = $jc(_$hash, password.hashCode);
    _$hash = $jc(_$hash, permanent.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'SignInDto')
          ..add('email', email)
          ..add('password', password)
          ..add('permanent', permanent))
        .toString();
  }
}

class SignInDtoBuilder implements Builder<SignInDto, SignInDtoBuilder> {
  _$SignInDto? _$v;

  String? _email;
  String? get email => _$this._email;
  set email(String? email) => _$this._email = email;

  String? _password;
  String? get password => _$this._password;
  set password(String? password) => _$this._password = password;

  bool? _permanent;
  bool? get permanent => _$this._permanent;
  set permanent(bool? permanent) => _$this._permanent = permanent;

  SignInDtoBuilder() {
    SignInDto._defaults(this);
  }

  SignInDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _email = $v.email;
      _password = $v.password;
      _permanent = $v.permanent;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(SignInDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$SignInDto;
  }

  @override
  void update(void Function(SignInDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  SignInDto build() => _build();

  _$SignInDto _build() {
    final _$result = _$v ??
        new _$SignInDto._(
            email: BuiltValueNullFieldError.checkNotNull(
                email, r'SignInDto', 'email'),
            password: BuiltValueNullFieldError.checkNotNull(
                password, r'SignInDto', 'password'),
            permanent: BuiltValueNullFieldError.checkNotNull(
                permanent, r'SignInDto', 'permanent'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
