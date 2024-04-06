// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'basic_user_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$BasicUserDto extends BasicUserDto {
  @override
  final String id;
  @override
  final String name;

  factory _$BasicUserDto([void Function(BasicUserDtoBuilder)? updates]) =>
      (new BasicUserDtoBuilder()..update(updates))._build();

  _$BasicUserDto._({required this.id, required this.name}) : super._() {
    BuiltValueNullFieldError.checkNotNull(id, r'BasicUserDto', 'id');
    BuiltValueNullFieldError.checkNotNull(name, r'BasicUserDto', 'name');
  }

  @override
  BasicUserDto rebuild(void Function(BasicUserDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  BasicUserDtoBuilder toBuilder() => new BasicUserDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is BasicUserDto && id == other.id && name == other.name;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, name.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'BasicUserDto')
          ..add('id', id)
          ..add('name', name))
        .toString();
  }
}

class BasicUserDtoBuilder
    implements Builder<BasicUserDto, BasicUserDtoBuilder> {
  _$BasicUserDto? _$v;

  String? _id;
  String? get id => _$this._id;
  set id(String? id) => _$this._id = id;

  String? _name;
  String? get name => _$this._name;
  set name(String? name) => _$this._name = name;

  BasicUserDtoBuilder() {
    BasicUserDto._defaults(this);
  }

  BasicUserDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _name = $v.name;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(BasicUserDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$BasicUserDto;
  }

  @override
  void update(void Function(BasicUserDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  BasicUserDto build() => _build();

  _$BasicUserDto _build() {
    final _$result = _$v ??
        new _$BasicUserDto._(
            id: BuiltValueNullFieldError.checkNotNull(
                id, r'BasicUserDto', 'id'),
            name: BuiltValueNullFieldError.checkNotNull(
                name, r'BasicUserDto', 'name'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
