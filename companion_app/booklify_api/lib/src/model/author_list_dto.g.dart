// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'author_list_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AuthorListDto extends AuthorListDto {
  @override
  final BuiltList<AuthorDto> authors;

  factory _$AuthorListDto([void Function(AuthorListDtoBuilder)? updates]) =>
      (new AuthorListDtoBuilder()..update(updates))._build();

  _$AuthorListDto._({required this.authors}) : super._() {
    BuiltValueNullFieldError.checkNotNull(authors, r'AuthorListDto', 'authors');
  }

  @override
  AuthorListDto rebuild(void Function(AuthorListDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AuthorListDtoBuilder toBuilder() => new AuthorListDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AuthorListDto && authors == other.authors;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, authors.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'AuthorListDto')
          ..add('authors', authors))
        .toString();
  }
}

class AuthorListDtoBuilder
    implements Builder<AuthorListDto, AuthorListDtoBuilder> {
  _$AuthorListDto? _$v;

  ListBuilder<AuthorDto>? _authors;
  ListBuilder<AuthorDto> get authors =>
      _$this._authors ??= new ListBuilder<AuthorDto>();
  set authors(ListBuilder<AuthorDto>? authors) => _$this._authors = authors;

  AuthorListDtoBuilder() {
    AuthorListDto._defaults(this);
  }

  AuthorListDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _authors = $v.authors.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AuthorListDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$AuthorListDto;
  }

  @override
  void update(void Function(AuthorListDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AuthorListDto build() => _build();

  _$AuthorListDto _build() {
    _$AuthorListDto _$result;
    try {
      _$result = _$v ?? new _$AuthorListDto._(authors: authors.build());
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'authors';
        authors.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            r'AuthorListDto', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
