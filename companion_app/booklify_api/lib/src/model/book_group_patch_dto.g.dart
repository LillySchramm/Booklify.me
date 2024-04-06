// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'book_group_patch_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$BookGroupPatchDto extends BookGroupPatchDto {
  @override
  final String name;

  factory _$BookGroupPatchDto(
          [void Function(BookGroupPatchDtoBuilder)? updates]) =>
      (new BookGroupPatchDtoBuilder()..update(updates))._build();

  _$BookGroupPatchDto._({required this.name}) : super._() {
    BuiltValueNullFieldError.checkNotNull(name, r'BookGroupPatchDto', 'name');
  }

  @override
  BookGroupPatchDto rebuild(void Function(BookGroupPatchDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  BookGroupPatchDtoBuilder toBuilder() =>
      new BookGroupPatchDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is BookGroupPatchDto && name == other.name;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, name.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'BookGroupPatchDto')
          ..add('name', name))
        .toString();
  }
}

class BookGroupPatchDtoBuilder
    implements Builder<BookGroupPatchDto, BookGroupPatchDtoBuilder> {
  _$BookGroupPatchDto? _$v;

  String? _name;
  String? get name => _$this._name;
  set name(String? name) => _$this._name = name;

  BookGroupPatchDtoBuilder() {
    BookGroupPatchDto._defaults(this);
  }

  BookGroupPatchDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _name = $v.name;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(BookGroupPatchDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$BookGroupPatchDto;
  }

  @override
  void update(void Function(BookGroupPatchDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  BookGroupPatchDto build() => _build();

  _$BookGroupPatchDto _build() {
    final _$result = _$v ??
        new _$BookGroupPatchDto._(
            name: BuiltValueNullFieldError.checkNotNull(
                name, r'BookGroupPatchDto', 'name'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
