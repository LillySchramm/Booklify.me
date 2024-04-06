// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'reset_password_request_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$ResetPasswordRequestDto extends ResetPasswordRequestDto {
  @override
  final String email;

  factory _$ResetPasswordRequestDto(
          [void Function(ResetPasswordRequestDtoBuilder)? updates]) =>
      (new ResetPasswordRequestDtoBuilder()..update(updates))._build();

  _$ResetPasswordRequestDto._({required this.email}) : super._() {
    BuiltValueNullFieldError.checkNotNull(
        email, r'ResetPasswordRequestDto', 'email');
  }

  @override
  ResetPasswordRequestDto rebuild(
          void Function(ResetPasswordRequestDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  ResetPasswordRequestDtoBuilder toBuilder() =>
      new ResetPasswordRequestDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is ResetPasswordRequestDto && email == other.email;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, email.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'ResetPasswordRequestDto')
          ..add('email', email))
        .toString();
  }
}

class ResetPasswordRequestDtoBuilder
    implements
        Builder<ResetPasswordRequestDto, ResetPasswordRequestDtoBuilder> {
  _$ResetPasswordRequestDto? _$v;

  String? _email;
  String? get email => _$this._email;
  set email(String? email) => _$this._email = email;

  ResetPasswordRequestDtoBuilder() {
    ResetPasswordRequestDto._defaults(this);
  }

  ResetPasswordRequestDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _email = $v.email;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(ResetPasswordRequestDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$ResetPasswordRequestDto;
  }

  @override
  void update(void Function(ResetPasswordRequestDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  ResetPasswordRequestDto build() => _build();

  _$ResetPasswordRequestDto _build() {
    final _$result = _$v ??
        new _$ResetPasswordRequestDto._(
            email: BuiltValueNullFieldError.checkNotNull(
                email, r'ResetPasswordRequestDto', 'email'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
