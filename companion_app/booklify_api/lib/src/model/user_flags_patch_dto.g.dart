// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_flags_patch_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$UserFlagsPatchDto extends UserFlagsPatchDto {
  @override
  final bool? public;
  @override
  final bool? changelogNotificationEnabled;

  factory _$UserFlagsPatchDto(
          [void Function(UserFlagsPatchDtoBuilder)? updates]) =>
      (new UserFlagsPatchDtoBuilder()..update(updates))._build();

  _$UserFlagsPatchDto._({this.public, this.changelogNotificationEnabled})
      : super._();

  @override
  UserFlagsPatchDto rebuild(void Function(UserFlagsPatchDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  UserFlagsPatchDtoBuilder toBuilder() =>
      new UserFlagsPatchDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is UserFlagsPatchDto &&
        public == other.public &&
        changelogNotificationEnabled == other.changelogNotificationEnabled;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, public.hashCode);
    _$hash = $jc(_$hash, changelogNotificationEnabled.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'UserFlagsPatchDto')
          ..add('public', public)
          ..add('changelogNotificationEnabled', changelogNotificationEnabled))
        .toString();
  }
}

class UserFlagsPatchDtoBuilder
    implements Builder<UserFlagsPatchDto, UserFlagsPatchDtoBuilder> {
  _$UserFlagsPatchDto? _$v;

  bool? _public;
  bool? get public => _$this._public;
  set public(bool? public) => _$this._public = public;

  bool? _changelogNotificationEnabled;
  bool? get changelogNotificationEnabled =>
      _$this._changelogNotificationEnabled;
  set changelogNotificationEnabled(bool? changelogNotificationEnabled) =>
      _$this._changelogNotificationEnabled = changelogNotificationEnabled;

  UserFlagsPatchDtoBuilder() {
    UserFlagsPatchDto._defaults(this);
  }

  UserFlagsPatchDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _public = $v.public;
      _changelogNotificationEnabled = $v.changelogNotificationEnabled;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(UserFlagsPatchDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$UserFlagsPatchDto;
  }

  @override
  void update(void Function(UserFlagsPatchDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  UserFlagsPatchDto build() => _build();

  _$UserFlagsPatchDto _build() {
    final _$result = _$v ??
        new _$UserFlagsPatchDto._(
            public: public,
            changelogNotificationEnabled: changelogNotificationEnabled);
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
