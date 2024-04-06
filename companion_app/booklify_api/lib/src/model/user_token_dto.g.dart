// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_token_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$UserTokenDto extends UserTokenDto {
  @override
  final String accessToken;

  factory _$UserTokenDto([void Function(UserTokenDtoBuilder)? updates]) =>
      (new UserTokenDtoBuilder()..update(updates))._build();

  _$UserTokenDto._({required this.accessToken}) : super._() {
    BuiltValueNullFieldError.checkNotNull(
        accessToken, r'UserTokenDto', 'accessToken');
  }

  @override
  UserTokenDto rebuild(void Function(UserTokenDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  UserTokenDtoBuilder toBuilder() => new UserTokenDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is UserTokenDto && accessToken == other.accessToken;
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
    return (newBuiltValueToStringHelper(r'UserTokenDto')
          ..add('accessToken', accessToken))
        .toString();
  }
}

class UserTokenDtoBuilder
    implements Builder<UserTokenDto, UserTokenDtoBuilder> {
  _$UserTokenDto? _$v;

  String? _accessToken;
  String? get accessToken => _$this._accessToken;
  set accessToken(String? accessToken) => _$this._accessToken = accessToken;

  UserTokenDtoBuilder() {
    UserTokenDto._defaults(this);
  }

  UserTokenDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _accessToken = $v.accessToken;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(UserTokenDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$UserTokenDto;
  }

  @override
  void update(void Function(UserTokenDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  UserTokenDto build() => _build();

  _$UserTokenDto _build() {
    final _$result = _$v ??
        new _$UserTokenDto._(
            accessToken: BuiltValueNullFieldError.checkNotNull(
                accessToken, r'UserTokenDto', 'accessToken'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
