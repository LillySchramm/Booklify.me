// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'publisher_list_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$PublisherListDto extends PublisherListDto {
  @override
  final BuiltList<PublisherDto> publishers;

  factory _$PublisherListDto(
          [void Function(PublisherListDtoBuilder)? updates]) =>
      (new PublisherListDtoBuilder()..update(updates))._build();

  _$PublisherListDto._({required this.publishers}) : super._() {
    BuiltValueNullFieldError.checkNotNull(
        publishers, r'PublisherListDto', 'publishers');
  }

  @override
  PublisherListDto rebuild(void Function(PublisherListDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  PublisherListDtoBuilder toBuilder() =>
      new PublisherListDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is PublisherListDto && publishers == other.publishers;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, publishers.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'PublisherListDto')
          ..add('publishers', publishers))
        .toString();
  }
}

class PublisherListDtoBuilder
    implements Builder<PublisherListDto, PublisherListDtoBuilder> {
  _$PublisherListDto? _$v;

  ListBuilder<PublisherDto>? _publishers;
  ListBuilder<PublisherDto> get publishers =>
      _$this._publishers ??= new ListBuilder<PublisherDto>();
  set publishers(ListBuilder<PublisherDto>? publishers) =>
      _$this._publishers = publishers;

  PublisherListDtoBuilder() {
    PublisherListDto._defaults(this);
  }

  PublisherListDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _publishers = $v.publishers.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(PublisherListDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$PublisherListDto;
  }

  @override
  void update(void Function(PublisherListDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  PublisherListDto build() => _build();

  _$PublisherListDto _build() {
    _$PublisherListDto _$result;
    try {
      _$result =
          _$v ?? new _$PublisherListDto._(publishers: publishers.build());
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'publishers';
        publishers.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            r'PublisherListDto', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
