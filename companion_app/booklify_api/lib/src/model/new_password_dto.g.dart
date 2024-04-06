// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'new_password_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$NewPasswordDto extends NewPasswordDto {
  @override
  final String resetId;
  @override
  final String resetToken;
  @override
  final String userId;
  @override
  final String newPassword;

  factory _$NewPasswordDto([void Function(NewPasswordDtoBuilder)? updates]) =>
      (new NewPasswordDtoBuilder()..update(updates))._build();

  _$NewPasswordDto._(
      {required this.resetId,
      required this.resetToken,
      required this.userId,
      required this.newPassword})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        resetId, r'NewPasswordDto', 'resetId');
    BuiltValueNullFieldError.checkNotNull(
        resetToken, r'NewPasswordDto', 'resetToken');
    BuiltValueNullFieldError.checkNotNull(userId, r'NewPasswordDto', 'userId');
    BuiltValueNullFieldError.checkNotNull(
        newPassword, r'NewPasswordDto', 'newPassword');
  }

  @override
  NewPasswordDto rebuild(void Function(NewPasswordDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  NewPasswordDtoBuilder toBuilder() =>
      new NewPasswordDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is NewPasswordDto &&
        resetId == other.resetId &&
        resetToken == other.resetToken &&
        userId == other.userId &&
        newPassword == other.newPassword;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, resetId.hashCode);
    _$hash = $jc(_$hash, resetToken.hashCode);
    _$hash = $jc(_$hash, userId.hashCode);
    _$hash = $jc(_$hash, newPassword.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'NewPasswordDto')
          ..add('resetId', resetId)
          ..add('resetToken', resetToken)
          ..add('userId', userId)
          ..add('newPassword', newPassword))
        .toString();
  }
}

class NewPasswordDtoBuilder
    implements Builder<NewPasswordDto, NewPasswordDtoBuilder> {
  _$NewPasswordDto? _$v;

  String? _resetId;
  String? get resetId => _$this._resetId;
  set resetId(String? resetId) => _$this._resetId = resetId;

  String? _resetToken;
  String? get resetToken => _$this._resetToken;
  set resetToken(String? resetToken) => _$this._resetToken = resetToken;

  String? _userId;
  String? get userId => _$this._userId;
  set userId(String? userId) => _$this._userId = userId;

  String? _newPassword;
  String? get newPassword => _$this._newPassword;
  set newPassword(String? newPassword) => _$this._newPassword = newPassword;

  NewPasswordDtoBuilder() {
    NewPasswordDto._defaults(this);
  }

  NewPasswordDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _resetId = $v.resetId;
      _resetToken = $v.resetToken;
      _userId = $v.userId;
      _newPassword = $v.newPassword;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(NewPasswordDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$NewPasswordDto;
  }

  @override
  void update(void Function(NewPasswordDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  NewPasswordDto build() => _build();

  _$NewPasswordDto _build() {
    final _$result = _$v ??
        new _$NewPasswordDto._(
            resetId: BuiltValueNullFieldError.checkNotNull(
                resetId, r'NewPasswordDto', 'resetId'),
            resetToken: BuiltValueNullFieldError.checkNotNull(
                resetToken, r'NewPasswordDto', 'resetToken'),
            userId: BuiltValueNullFieldError.checkNotNull(
                userId, r'NewPasswordDto', 'userId'),
            newPassword: BuiltValueNullFieldError.checkNotNull(
                newPassword, r'NewPasswordDto', 'newPassword'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
