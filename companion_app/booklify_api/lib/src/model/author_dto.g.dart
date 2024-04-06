// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'author_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AuthorDto extends AuthorDto {
  @override
  final String id;
  @override
  final String name;
  @override
  final DateTime createdAt;
  @override
  final DateTime updatedAt;

  factory _$AuthorDto([void Function(AuthorDtoBuilder)? updates]) =>
      (new AuthorDtoBuilder()..update(updates))._build();

  _$AuthorDto._(
      {required this.id,
      required this.name,
      required this.createdAt,
      required this.updatedAt})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(id, r'AuthorDto', 'id');
    BuiltValueNullFieldError.checkNotNull(name, r'AuthorDto', 'name');
    BuiltValueNullFieldError.checkNotNull(createdAt, r'AuthorDto', 'createdAt');
    BuiltValueNullFieldError.checkNotNull(updatedAt, r'AuthorDto', 'updatedAt');
  }

  @override
  AuthorDto rebuild(void Function(AuthorDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AuthorDtoBuilder toBuilder() => new AuthorDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AuthorDto &&
        id == other.id &&
        name == other.name &&
        createdAt == other.createdAt &&
        updatedAt == other.updatedAt;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, name.hashCode);
    _$hash = $jc(_$hash, createdAt.hashCode);
    _$hash = $jc(_$hash, updatedAt.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'AuthorDto')
          ..add('id', id)
          ..add('name', name)
          ..add('createdAt', createdAt)
          ..add('updatedAt', updatedAt))
        .toString();
  }
}

class AuthorDtoBuilder implements Builder<AuthorDto, AuthorDtoBuilder> {
  _$AuthorDto? _$v;

  String? _id;
  String? get id => _$this._id;
  set id(String? id) => _$this._id = id;

  String? _name;
  String? get name => _$this._name;
  set name(String? name) => _$this._name = name;

  DateTime? _createdAt;
  DateTime? get createdAt => _$this._createdAt;
  set createdAt(DateTime? createdAt) => _$this._createdAt = createdAt;

  DateTime? _updatedAt;
  DateTime? get updatedAt => _$this._updatedAt;
  set updatedAt(DateTime? updatedAt) => _$this._updatedAt = updatedAt;

  AuthorDtoBuilder() {
    AuthorDto._defaults(this);
  }

  AuthorDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _name = $v.name;
      _createdAt = $v.createdAt;
      _updatedAt = $v.updatedAt;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AuthorDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$AuthorDto;
  }

  @override
  void update(void Function(AuthorDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AuthorDto build() => _build();

  _$AuthorDto _build() {
    final _$result = _$v ??
        new _$AuthorDto._(
            id: BuiltValueNullFieldError.checkNotNull(id, r'AuthorDto', 'id'),
            name: BuiltValueNullFieldError.checkNotNull(
                name, r'AuthorDto', 'name'),
            createdAt: BuiltValueNullFieldError.checkNotNull(
                createdAt, r'AuthorDto', 'createdAt'),
            updatedAt: BuiltValueNullFieldError.checkNotNull(
                updatedAt, r'AuthorDto', 'updatedAt'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
