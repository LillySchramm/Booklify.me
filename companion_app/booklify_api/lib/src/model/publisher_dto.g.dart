// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'publisher_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$PublisherDto extends PublisherDto {
  @override
  final String id;
  @override
  final String name;
  @override
  final DateTime createdAt;
  @override
  final DateTime updatedAt;

  factory _$PublisherDto([void Function(PublisherDtoBuilder)? updates]) =>
      (new PublisherDtoBuilder()..update(updates))._build();

  _$PublisherDto._(
      {required this.id,
      required this.name,
      required this.createdAt,
      required this.updatedAt})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(id, r'PublisherDto', 'id');
    BuiltValueNullFieldError.checkNotNull(name, r'PublisherDto', 'name');
    BuiltValueNullFieldError.checkNotNull(
        createdAt, r'PublisherDto', 'createdAt');
    BuiltValueNullFieldError.checkNotNull(
        updatedAt, r'PublisherDto', 'updatedAt');
  }

  @override
  PublisherDto rebuild(void Function(PublisherDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  PublisherDtoBuilder toBuilder() => new PublisherDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is PublisherDto &&
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
    return (newBuiltValueToStringHelper(r'PublisherDto')
          ..add('id', id)
          ..add('name', name)
          ..add('createdAt', createdAt)
          ..add('updatedAt', updatedAt))
        .toString();
  }
}

class PublisherDtoBuilder
    implements Builder<PublisherDto, PublisherDtoBuilder> {
  _$PublisherDto? _$v;

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

  PublisherDtoBuilder() {
    PublisherDto._defaults(this);
  }

  PublisherDtoBuilder get _$this {
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
  void replace(PublisherDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$PublisherDto;
  }

  @override
  void update(void Function(PublisherDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  PublisherDto build() => _build();

  _$PublisherDto _build() {
    final _$result = _$v ??
        new _$PublisherDto._(
            id: BuiltValueNullFieldError.checkNotNull(
                id, r'PublisherDto', 'id'),
            name: BuiltValueNullFieldError.checkNotNull(
                name, r'PublisherDto', 'name'),
            createdAt: BuiltValueNullFieldError.checkNotNull(
                createdAt, r'PublisherDto', 'createdAt'),
            updatedAt: BuiltValueNullFieldError.checkNotNull(
                updatedAt, r'PublisherDto', 'updatedAt'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
