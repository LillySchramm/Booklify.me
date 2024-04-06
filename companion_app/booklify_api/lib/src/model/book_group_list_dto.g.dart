// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'book_group_list_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$BookGroupListDto extends BookGroupListDto {
  @override
  final BuiltList<BookGroupDto> groups;

  factory _$BookGroupListDto(
          [void Function(BookGroupListDtoBuilder)? updates]) =>
      (new BookGroupListDtoBuilder()..update(updates))._build();

  _$BookGroupListDto._({required this.groups}) : super._() {
    BuiltValueNullFieldError.checkNotNull(
        groups, r'BookGroupListDto', 'groups');
  }

  @override
  BookGroupListDto rebuild(void Function(BookGroupListDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  BookGroupListDtoBuilder toBuilder() =>
      new BookGroupListDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is BookGroupListDto && groups == other.groups;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, groups.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'BookGroupListDto')
          ..add('groups', groups))
        .toString();
  }
}

class BookGroupListDtoBuilder
    implements Builder<BookGroupListDto, BookGroupListDtoBuilder> {
  _$BookGroupListDto? _$v;

  ListBuilder<BookGroupDto>? _groups;
  ListBuilder<BookGroupDto> get groups =>
      _$this._groups ??= new ListBuilder<BookGroupDto>();
  set groups(ListBuilder<BookGroupDto>? groups) => _$this._groups = groups;

  BookGroupListDtoBuilder() {
    BookGroupListDto._defaults(this);
  }

  BookGroupListDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _groups = $v.groups.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(BookGroupListDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$BookGroupListDto;
  }

  @override
  void update(void Function(BookGroupListDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  BookGroupListDto build() => _build();

  _$BookGroupListDto _build() {
    _$BookGroupListDto _$result;
    try {
      _$result = _$v ?? new _$BookGroupListDto._(groups: groups.build());
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'groups';
        groups.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            r'BookGroupListDto', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
