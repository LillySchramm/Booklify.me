// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$UserDto extends UserDto {
  @override
  final String id;
  @override
  final String name;
  @override
  final String email;
  @override
  final DateTime createdAt;
  @override
  final DateTime updatedAt;
  @override
  final bool activated;

  factory _$UserDto([void Function(UserDtoBuilder)? updates]) =>
      (new UserDtoBuilder()..update(updates))._build();

  _$UserDto._(
      {required this.id,
      required this.name,
      required this.email,
      required this.createdAt,
      required this.updatedAt,
      required this.activated})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(id, r'UserDto', 'id');
    BuiltValueNullFieldError.checkNotNull(name, r'UserDto', 'name');
    BuiltValueNullFieldError.checkNotNull(email, r'UserDto', 'email');
    BuiltValueNullFieldError.checkNotNull(createdAt, r'UserDto', 'createdAt');
    BuiltValueNullFieldError.checkNotNull(updatedAt, r'UserDto', 'updatedAt');
    BuiltValueNullFieldError.checkNotNull(activated, r'UserDto', 'activated');
  }

  @override
  UserDto rebuild(void Function(UserDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  UserDtoBuilder toBuilder() => new UserDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is UserDto &&
        id == other.id &&
        name == other.name &&
        email == other.email &&
        createdAt == other.createdAt &&
        updatedAt == other.updatedAt &&
        activated == other.activated;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, name.hashCode);
    _$hash = $jc(_$hash, email.hashCode);
    _$hash = $jc(_$hash, createdAt.hashCode);
    _$hash = $jc(_$hash, updatedAt.hashCode);
    _$hash = $jc(_$hash, activated.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'UserDto')
          ..add('id', id)
          ..add('name', name)
          ..add('email', email)
          ..add('createdAt', createdAt)
          ..add('updatedAt', updatedAt)
          ..add('activated', activated))
        .toString();
  }
}

class UserDtoBuilder implements Builder<UserDto, UserDtoBuilder> {
  _$UserDto? _$v;

  String? _id;
  String? get id => _$this._id;
  set id(String? id) => _$this._id = id;

  String? _name;
  String? get name => _$this._name;
  set name(String? name) => _$this._name = name;

  String? _email;
  String? get email => _$this._email;
  set email(String? email) => _$this._email = email;

  DateTime? _createdAt;
  DateTime? get createdAt => _$this._createdAt;
  set createdAt(DateTime? createdAt) => _$this._createdAt = createdAt;

  DateTime? _updatedAt;
  DateTime? get updatedAt => _$this._updatedAt;
  set updatedAt(DateTime? updatedAt) => _$this._updatedAt = updatedAt;

  bool? _activated;
  bool? get activated => _$this._activated;
  set activated(bool? activated) => _$this._activated = activated;

  UserDtoBuilder() {
    UserDto._defaults(this);
  }

  UserDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _name = $v.name;
      _email = $v.email;
      _createdAt = $v.createdAt;
      _updatedAt = $v.updatedAt;
      _activated = $v.activated;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(UserDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$UserDto;
  }

  @override
  void update(void Function(UserDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  UserDto build() => _build();

  _$UserDto _build() {
    final _$result = _$v ??
        new _$UserDto._(
            id: BuiltValueNullFieldError.checkNotNull(id, r'UserDto', 'id'),
            name:
                BuiltValueNullFieldError.checkNotNull(name, r'UserDto', 'name'),
            email: BuiltValueNullFieldError.checkNotNull(
                email, r'UserDto', 'email'),
            createdAt: BuiltValueNullFieldError.checkNotNull(
                createdAt, r'UserDto', 'createdAt'),
            updatedAt: BuiltValueNullFieldError.checkNotNull(
                updatedAt, r'UserDto', 'updatedAt'),
            activated: BuiltValueNullFieldError.checkNotNull(
                activated, r'UserDto', 'activated'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
