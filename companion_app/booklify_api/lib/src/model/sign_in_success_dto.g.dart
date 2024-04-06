// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'sign_in_success_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$SignInSuccessDto extends SignInSuccessDto {
  @override
  final String accessToken;

  factory _$SignInSuccessDto(
          [void Function(SignInSuccessDtoBuilder)? updates]) =>
      (new SignInSuccessDtoBuilder()..update(updates))._build();

  _$SignInSuccessDto._({required this.accessToken}) : super._() {
    BuiltValueNullFieldError.checkNotNull(
        accessToken, r'SignInSuccessDto', 'accessToken');
  }

  @override
  SignInSuccessDto rebuild(void Function(SignInSuccessDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  SignInSuccessDtoBuilder toBuilder() =>
      new SignInSuccessDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is SignInSuccessDto && accessToken == other.accessToken;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, accessToken.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'SignInSuccessDto')
          ..add('accessToken', accessToken))
        .toString();
  }
}

class SignInSuccessDtoBuilder
    implements Builder<SignInSuccessDto, SignInSuccessDtoBuilder> {
  _$SignInSuccessDto? _$v;

  String? _accessToken;
  String? get accessToken => _$this._accessToken;
  set accessToken(String? accessToken) => _$this._accessToken = accessToken;

  SignInSuccessDtoBuilder() {
    SignInSuccessDto._defaults(this);
  }

  SignInSuccessDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _accessToken = $v.accessToken;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(SignInSuccessDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$SignInSuccessDto;
  }

  @override
  void update(void Function(SignInSuccessDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  SignInSuccessDto build() => _build();

  _$SignInSuccessDto _build() {
    final _$result = _$v ??
        new _$SignInSuccessDto._(
            accessToken: BuiltValueNullFieldError.checkNotNull(
                accessToken, r'SignInSuccessDto', 'accessToken'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
