// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_flags_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$UserFlagsDto extends UserFlagsDto {
  @override
  final bool public;
  @override
  final bool changelogNotificationEnabled;

  factory _$UserFlagsDto([void Function(UserFlagsDtoBuilder)? updates]) =>
      (new UserFlagsDtoBuilder()..update(updates))._build();

  _$UserFlagsDto._(
      {required this.public, required this.changelogNotificationEnabled})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(public, r'UserFlagsDto', 'public');
    BuiltValueNullFieldError.checkNotNull(changelogNotificationEnabled,
        r'UserFlagsDto', 'changelogNotificationEnabled');
  }

  @override
  UserFlagsDto rebuild(void Function(UserFlagsDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  UserFlagsDtoBuilder toBuilder() => new UserFlagsDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is UserFlagsDto &&
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
    return (newBuiltValueToStringHelper(r'UserFlagsDto')
          ..add('public', public)
          ..add('changelogNotificationEnabled', changelogNotificationEnabled))
        .toString();
  }
}

class UserFlagsDtoBuilder
    implements Builder<UserFlagsDto, UserFlagsDtoBuilder> {
  _$UserFlagsDto? _$v;

  bool? _public;
  bool? get public => _$this._public;
  set public(bool? public) => _$this._public = public;

  bool? _changelogNotificationEnabled;
  bool? get changelogNotificationEnabled =>
      _$this._changelogNotificationEnabled;
  set changelogNotificationEnabled(bool? changelogNotificationEnabled) =>
      _$this._changelogNotificationEnabled = changelogNotificationEnabled;

  UserFlagsDtoBuilder() {
    UserFlagsDto._defaults(this);
  }

  UserFlagsDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _public = $v.public;
      _changelogNotificationEnabled = $v.changelogNotificationEnabled;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(UserFlagsDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$UserFlagsDto;
  }

  @override
  void update(void Function(UserFlagsDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  UserFlagsDto build() => _build();

  _$UserFlagsDto _build() {
    final _$result = _$v ??
        new _$UserFlagsDto._(
            public: BuiltValueNullFieldError.checkNotNull(
                public, r'UserFlagsDto', 'public'),
            changelogNotificationEnabled: BuiltValueNullFieldError.checkNotNull(
                changelogNotificationEnabled,
                r'UserFlagsDto',
                'changelogNotificationEnabled'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
