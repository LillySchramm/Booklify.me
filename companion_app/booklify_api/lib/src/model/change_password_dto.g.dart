// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'change_password_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$ChangePasswordDto extends ChangePasswordDto {
  @override
  final String oldPassword;
  @override
  final String newPassword;

  factory _$ChangePasswordDto(
          [void Function(ChangePasswordDtoBuilder)? updates]) =>
      (new ChangePasswordDtoBuilder()..update(updates))._build();

  _$ChangePasswordDto._({required this.oldPassword, required this.newPassword})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        oldPassword, r'ChangePasswordDto', 'oldPassword');
    BuiltValueNullFieldError.checkNotNull(
        newPassword, r'ChangePasswordDto', 'newPassword');
  }

  @override
  ChangePasswordDto rebuild(void Function(ChangePasswordDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  ChangePasswordDtoBuilder toBuilder() =>
      new ChangePasswordDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is ChangePasswordDto &&
        oldPassword == other.oldPassword &&
        newPassword == other.newPassword;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, oldPassword.hashCode);
    _$hash = $jc(_$hash, newPassword.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'ChangePasswordDto')
          ..add('oldPassword', oldPassword)
          ..add('newPassword', newPassword))
        .toString();
  }
}

class ChangePasswordDtoBuilder
    implements Builder<ChangePasswordDto, ChangePasswordDtoBuilder> {
  _$ChangePasswordDto? _$v;

  String? _oldPassword;
  String? get oldPassword => _$this._oldPassword;
  set oldPassword(String? oldPassword) => _$this._oldPassword = oldPassword;

  String? _newPassword;
  String? get newPassword => _$this._newPassword;
  set newPassword(String? newPassword) => _$this._newPassword = newPassword;

  ChangePasswordDtoBuilder() {
    ChangePasswordDto._defaults(this);
  }

  ChangePasswordDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _oldPassword = $v.oldPassword;
      _newPassword = $v.newPassword;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(ChangePasswordDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$ChangePasswordDto;
  }

  @override
  void update(void Function(ChangePasswordDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  ChangePasswordDto build() => _build();

  _$ChangePasswordDto _build() {
    final _$result = _$v ??
        new _$ChangePasswordDto._(
            oldPassword: BuiltValueNullFieldError.checkNotNull(
                oldPassword, r'ChangePasswordDto', 'oldPassword'),
            newPassword: BuiltValueNullFieldError.checkNotNull(
                newPassword, r'ChangePasswordDto', 'newPassword'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
