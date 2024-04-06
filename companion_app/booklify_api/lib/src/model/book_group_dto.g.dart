// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'book_group_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$BookGroupDto extends BookGroupDto {
  @override
  final String id;
  @override
  final String name;
  @override
  final String userId;
  @override
  final DateTime createdAt;
  @override
  final DateTime updatedAt;

  factory _$BookGroupDto([void Function(BookGroupDtoBuilder)? updates]) =>
      (new BookGroupDtoBuilder()..update(updates))._build();

  _$BookGroupDto._(
      {required this.id,
      required this.name,
      required this.userId,
      required this.createdAt,
      required this.updatedAt})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(id, r'BookGroupDto', 'id');
    BuiltValueNullFieldError.checkNotNull(name, r'BookGroupDto', 'name');
    BuiltValueNullFieldError.checkNotNull(userId, r'BookGroupDto', 'userId');
    BuiltValueNullFieldError.checkNotNull(
        createdAt, r'BookGroupDto', 'createdAt');
    BuiltValueNullFieldError.checkNotNull(
        updatedAt, r'BookGroupDto', 'updatedAt');
  }

  @override
  BookGroupDto rebuild(void Function(BookGroupDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  BookGroupDtoBuilder toBuilder() => new BookGroupDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is BookGroupDto &&
        id == other.id &&
        name == other.name &&
        userId == other.userId &&
        createdAt == other.createdAt &&
        updatedAt == other.updatedAt;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, name.hashCode);
    _$hash = $jc(_$hash, userId.hashCode);
    _$hash = $jc(_$hash, createdAt.hashCode);
    _$hash = $jc(_$hash, updatedAt.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'BookGroupDto')
          ..add('id', id)
          ..add('name', name)
          ..add('userId', userId)
          ..add('createdAt', createdAt)
          ..add('updatedAt', updatedAt))
        .toString();
  }
}

class BookGroupDtoBuilder
    implements Builder<BookGroupDto, BookGroupDtoBuilder> {
  _$BookGroupDto? _$v;

  String? _id;
  String? get id => _$this._id;
  set id(String? id) => _$this._id = id;

  String? _name;
  String? get name => _$this._name;
  set name(String? name) => _$this._name = name;

  String? _userId;
  String? get userId => _$this._userId;
  set userId(String? userId) => _$this._userId = userId;

  DateTime? _createdAt;
  DateTime? get createdAt => _$this._createdAt;
  set createdAt(DateTime? createdAt) => _$this._createdAt = createdAt;

  DateTime? _updatedAt;
  DateTime? get updatedAt => _$this._updatedAt;
  set updatedAt(DateTime? updatedAt) => _$this._updatedAt = updatedAt;

  BookGroupDtoBuilder() {
    BookGroupDto._defaults(this);
  }

  BookGroupDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _name = $v.name;
      _userId = $v.userId;
      _createdAt = $v.createdAt;
      _updatedAt = $v.updatedAt;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(BookGroupDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$BookGroupDto;
  }

  @override
  void update(void Function(BookGroupDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  BookGroupDto build() => _build();

  _$BookGroupDto _build() {
    final _$result = _$v ??
        new _$BookGroupDto._(
            id: BuiltValueNullFieldError.checkNotNull(
                id, r'BookGroupDto', 'id'),
            name: BuiltValueNullFieldError.checkNotNull(
                name, r'BookGroupDto', 'name'),
            userId: BuiltValueNullFieldError.checkNotNull(
                userId, r'BookGroupDto', 'userId'),
            createdAt: BuiltValueNullFieldError.checkNotNull(
                createdAt, r'BookGroupDto', 'createdAt'),
            updatedAt: BuiltValueNullFieldError.checkNotNull(
                updatedAt, r'BookGroupDto', 'updatedAt'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
