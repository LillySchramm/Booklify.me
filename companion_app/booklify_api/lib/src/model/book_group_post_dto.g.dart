// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'book_group_post_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$BookGroupPostDto extends BookGroupPostDto {
  @override
  final String name;

  factory _$BookGroupPostDto(
          [void Function(BookGroupPostDtoBuilder)? updates]) =>
      (new BookGroupPostDtoBuilder()..update(updates))._build();

  _$BookGroupPostDto._({required this.name}) : super._() {
    BuiltValueNullFieldError.checkNotNull(name, r'BookGroupPostDto', 'name');
  }

  @override
  BookGroupPostDto rebuild(void Function(BookGroupPostDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  BookGroupPostDtoBuilder toBuilder() =>
      new BookGroupPostDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is BookGroupPostDto && name == other.name;
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
    return (newBuiltValueToStringHelper(r'BookGroupPostDto')..add('name', name))
        .toString();
  }
}

class BookGroupPostDtoBuilder
    implements Builder<BookGroupPostDto, BookGroupPostDtoBuilder> {
  _$BookGroupPostDto? _$v;

  String? _name;
  String? get name => _$this._name;
  set name(String? name) => _$this._name = name;

  BookGroupPostDtoBuilder() {
    BookGroupPostDto._defaults(this);
  }

  BookGroupPostDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _name = $v.name;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(BookGroupPostDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$BookGroupPostDto;
  }

  @override
  void update(void Function(BookGroupPostDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  BookGroupPostDto build() => _build();

  _$BookGroupPostDto _build() {
    final _$result = _$v ??
        new _$BookGroupPostDto._(
            name: BuiltValueNullFieldError.checkNotNull(
                name, r'BookGroupPostDto', 'name'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
