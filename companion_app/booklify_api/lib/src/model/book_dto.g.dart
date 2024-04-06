// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'book_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$BookDto extends BookDto {
  @override
  final String isbn;
  @override
  final String? title;
  @override
  final String? subtitle;
  @override
  final String? publishedDate;
  @override
  final String? description;
  @override
  final num? pageCount;
  @override
  final num? printedPageCount;
  @override
  final String? language;
  @override
  final DateTime createdAt;
  @override
  final DateTime updatedAt;
  @override
  final String? publisherId;
  @override
  final String? bookCoverId;
  @override
  final String? amazonLink;
  @override
  final BuiltList<IdentifierDto> authors;
  @override
  final String? groupId;
  @override
  final bool hidden;
  @override
  final bool noGroup;
  @override
  final bool favorite;

  factory _$BookDto([void Function(BookDtoBuilder)? updates]) =>
      (new BookDtoBuilder()..update(updates))._build();

  _$BookDto._(
      {required this.isbn,
      this.title,
      this.subtitle,
      this.publishedDate,
      this.description,
      this.pageCount,
      this.printedPageCount,
      this.language,
      required this.createdAt,
      required this.updatedAt,
      this.publisherId,
      this.bookCoverId,
      this.amazonLink,
      required this.authors,
      this.groupId,
      required this.hidden,
      required this.noGroup,
      required this.favorite})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(isbn, r'BookDto', 'isbn');
    BuiltValueNullFieldError.checkNotNull(createdAt, r'BookDto', 'createdAt');
    BuiltValueNullFieldError.checkNotNull(updatedAt, r'BookDto', 'updatedAt');
    BuiltValueNullFieldError.checkNotNull(authors, r'BookDto', 'authors');
    BuiltValueNullFieldError.checkNotNull(hidden, r'BookDto', 'hidden');
    BuiltValueNullFieldError.checkNotNull(noGroup, r'BookDto', 'noGroup');
    BuiltValueNullFieldError.checkNotNull(favorite, r'BookDto', 'favorite');
  }

  @override
  BookDto rebuild(void Function(BookDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  BookDtoBuilder toBuilder() => new BookDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is BookDto &&
        isbn == other.isbn &&
        title == other.title &&
        subtitle == other.subtitle &&
        publishedDate == other.publishedDate &&
        description == other.description &&
        pageCount == other.pageCount &&
        printedPageCount == other.printedPageCount &&
        language == other.language &&
        createdAt == other.createdAt &&
        updatedAt == other.updatedAt &&
        publisherId == other.publisherId &&
        bookCoverId == other.bookCoverId &&
        amazonLink == other.amazonLink &&
        authors == other.authors &&
        groupId == other.groupId &&
        hidden == other.hidden &&
        noGroup == other.noGroup &&
        favorite == other.favorite;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, isbn.hashCode);
    _$hash = $jc(_$hash, title.hashCode);
    _$hash = $jc(_$hash, subtitle.hashCode);
    _$hash = $jc(_$hash, publishedDate.hashCode);
    _$hash = $jc(_$hash, description.hashCode);
    _$hash = $jc(_$hash, pageCount.hashCode);
    _$hash = $jc(_$hash, printedPageCount.hashCode);
    _$hash = $jc(_$hash, language.hashCode);
    _$hash = $jc(_$hash, createdAt.hashCode);
    _$hash = $jc(_$hash, updatedAt.hashCode);
    _$hash = $jc(_$hash, publisherId.hashCode);
    _$hash = $jc(_$hash, bookCoverId.hashCode);
    _$hash = $jc(_$hash, amazonLink.hashCode);
    _$hash = $jc(_$hash, authors.hashCode);
    _$hash = $jc(_$hash, groupId.hashCode);
    _$hash = $jc(_$hash, hidden.hashCode);
    _$hash = $jc(_$hash, noGroup.hashCode);
    _$hash = $jc(_$hash, favorite.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'BookDto')
          ..add('isbn', isbn)
          ..add('title', title)
          ..add('subtitle', subtitle)
          ..add('publishedDate', publishedDate)
          ..add('description', description)
          ..add('pageCount', pageCount)
          ..add('printedPageCount', printedPageCount)
          ..add('language', language)
          ..add('createdAt', createdAt)
          ..add('updatedAt', updatedAt)
          ..add('publisherId', publisherId)
          ..add('bookCoverId', bookCoverId)
          ..add('amazonLink', amazonLink)
          ..add('authors', authors)
          ..add('groupId', groupId)
          ..add('hidden', hidden)
          ..add('noGroup', noGroup)
          ..add('favorite', favorite))
        .toString();
  }
}

class BookDtoBuilder implements Builder<BookDto, BookDtoBuilder> {
  _$BookDto? _$v;

  String? _isbn;
  String? get isbn => _$this._isbn;
  set isbn(String? isbn) => _$this._isbn = isbn;

  String? _title;
  String? get title => _$this._title;
  set title(String? title) => _$this._title = title;

  String? _subtitle;
  String? get subtitle => _$this._subtitle;
  set subtitle(String? subtitle) => _$this._subtitle = subtitle;

  String? _publishedDate;
  String? get publishedDate => _$this._publishedDate;
  set publishedDate(String? publishedDate) =>
      _$this._publishedDate = publishedDate;

  String? _description;
  String? get description => _$this._description;
  set description(String? description) => _$this._description = description;

  num? _pageCount;
  num? get pageCount => _$this._pageCount;
  set pageCount(num? pageCount) => _$this._pageCount = pageCount;

  num? _printedPageCount;
  num? get printedPageCount => _$this._printedPageCount;
  set printedPageCount(num? printedPageCount) =>
      _$this._printedPageCount = printedPageCount;

  String? _language;
  String? get language => _$this._language;
  set language(String? language) => _$this._language = language;

  DateTime? _createdAt;
  DateTime? get createdAt => _$this._createdAt;
  set createdAt(DateTime? createdAt) => _$this._createdAt = createdAt;

  DateTime? _updatedAt;
  DateTime? get updatedAt => _$this._updatedAt;
  set updatedAt(DateTime? updatedAt) => _$this._updatedAt = updatedAt;

  String? _publisherId;
  String? get publisherId => _$this._publisherId;
  set publisherId(String? publisherId) => _$this._publisherId = publisherId;

  String? _bookCoverId;
  String? get bookCoverId => _$this._bookCoverId;
  set bookCoverId(String? bookCoverId) => _$this._bookCoverId = bookCoverId;

  String? _amazonLink;
  String? get amazonLink => _$this._amazonLink;
  set amazonLink(String? amazonLink) => _$this._amazonLink = amazonLink;

  ListBuilder<IdentifierDto>? _authors;
  ListBuilder<IdentifierDto> get authors =>
      _$this._authors ??= new ListBuilder<IdentifierDto>();
  set authors(ListBuilder<IdentifierDto>? authors) => _$this._authors = authors;

  String? _groupId;
  String? get groupId => _$this._groupId;
  set groupId(String? groupId) => _$this._groupId = groupId;

  bool? _hidden;
  bool? get hidden => _$this._hidden;
  set hidden(bool? hidden) => _$this._hidden = hidden;

  bool? _noGroup;
  bool? get noGroup => _$this._noGroup;
  set noGroup(bool? noGroup) => _$this._noGroup = noGroup;

  bool? _favorite;
  bool? get favorite => _$this._favorite;
  set favorite(bool? favorite) => _$this._favorite = favorite;

  BookDtoBuilder() {
    BookDto._defaults(this);
  }

  BookDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _isbn = $v.isbn;
      _title = $v.title;
      _subtitle = $v.subtitle;
      _publishedDate = $v.publishedDate;
      _description = $v.description;
      _pageCount = $v.pageCount;
      _printedPageCount = $v.printedPageCount;
      _language = $v.language;
      _createdAt = $v.createdAt;
      _updatedAt = $v.updatedAt;
      _publisherId = $v.publisherId;
      _bookCoverId = $v.bookCoverId;
      _amazonLink = $v.amazonLink;
      _authors = $v.authors.toBuilder();
      _groupId = $v.groupId;
      _hidden = $v.hidden;
      _noGroup = $v.noGroup;
      _favorite = $v.favorite;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(BookDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$BookDto;
  }

  @override
  void update(void Function(BookDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  BookDto build() => _build();

  _$BookDto _build() {
    _$BookDto _$result;
    try {
      _$result = _$v ??
          new _$BookDto._(
              isbn: BuiltValueNullFieldError.checkNotNull(
                  isbn, r'BookDto', 'isbn'),
              title: title,
              subtitle: subtitle,
              publishedDate: publishedDate,
              description: description,
              pageCount: pageCount,
              printedPageCount: printedPageCount,
              language: language,
              createdAt: BuiltValueNullFieldError.checkNotNull(
                  createdAt, r'BookDto', 'createdAt'),
              updatedAt: BuiltValueNullFieldError.checkNotNull(
                  updatedAt, r'BookDto', 'updatedAt'),
              publisherId: publisherId,
              bookCoverId: bookCoverId,
              amazonLink: amazonLink,
              authors: authors.build(),
              groupId: groupId,
              hidden: BuiltValueNullFieldError.checkNotNull(
                  hidden, r'BookDto', 'hidden'),
              noGroup: BuiltValueNullFieldError.checkNotNull(
                  noGroup, r'BookDto', 'noGroup'),
              favorite: BuiltValueNullFieldError.checkNotNull(
                  favorite, r'BookDto', 'favorite'));
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'authors';
        authors.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            r'BookDto', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
