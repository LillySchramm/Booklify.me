// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'identifier_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$IdentifierDto extends IdentifierDto {
  @override
  final String id;

  factory _$IdentifierDto([void Function(IdentifierDtoBuilder)? updates]) =>
      (new IdentifierDtoBuilder()..update(updates))._build();

  _$IdentifierDto._({required this.id}) : super._() {
    BuiltValueNullFieldError.checkNotNull(id, r'IdentifierDto', 'id');
  }

  @override
  IdentifierDto rebuild(void Function(IdentifierDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  IdentifierDtoBuilder toBuilder() => new IdentifierDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is IdentifierDto && id == other.id;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'IdentifierDto')..add('id', id))
        .toString();
  }
}

class IdentifierDtoBuilder
    implements Builder<IdentifierDto, IdentifierDtoBuilder> {
  _$IdentifierDto? _$v;

  String? _id;
  String? get id => _$this._id;
  set id(String? id) => _$this._id = id;

  IdentifierDtoBuilder() {
    IdentifierDto._defaults(this);
  }

  IdentifierDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(IdentifierDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$IdentifierDto;
  }

  @override
  void update(void Function(IdentifierDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  IdentifierDto build() => _build();

  _$IdentifierDto _build() {
    final _$result = _$v ??
        new _$IdentifierDto._(
            id: BuiltValueNullFieldError.checkNotNull(
                id, r'IdentifierDto', 'id'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
