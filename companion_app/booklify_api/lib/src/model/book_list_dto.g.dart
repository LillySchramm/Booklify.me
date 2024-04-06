// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'book_list_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$BookListDto extends BookListDto {
  @override
  final BuiltList<BookDto> books;

  factory _$BookListDto([void Function(BookListDtoBuilder)? updates]) =>
      (new BookListDtoBuilder()..update(updates))._build();

  _$BookListDto._({required this.books}) : super._() {
    BuiltValueNullFieldError.checkNotNull(books, r'BookListDto', 'books');
  }

  @override
  BookListDto rebuild(void Function(BookListDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  BookListDtoBuilder toBuilder() => new BookListDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is BookListDto && books == other.books;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, books.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'BookListDto')..add('books', books))
        .toString();
  }
}

class BookListDtoBuilder implements Builder<BookListDto, BookListDtoBuilder> {
  _$BookListDto? _$v;

  ListBuilder<BookDto>? _books;
  ListBuilder<BookDto> get books =>
      _$this._books ??= new ListBuilder<BookDto>();
  set books(ListBuilder<BookDto>? books) => _$this._books = books;

  BookListDtoBuilder() {
    BookListDto._defaults(this);
  }

  BookListDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _books = $v.books.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(BookListDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$BookListDto;
  }

  @override
  void update(void Function(BookListDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  BookListDto build() => _build();

  _$BookListDto _build() {
    _$BookListDto _$result;
    try {
      _$result = _$v ?? new _$BookListDto._(books: books.build());
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'books';
        books.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            r'BookListDto', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
