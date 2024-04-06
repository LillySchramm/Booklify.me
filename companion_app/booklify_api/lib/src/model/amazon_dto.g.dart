// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'amazon_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AmazonDto extends AmazonDto {
  @override
  final String referralTag;

  factory _$AmazonDto([void Function(AmazonDtoBuilder)? updates]) =>
      (new AmazonDtoBuilder()..update(updates))._build();

  _$AmazonDto._({required this.referralTag}) : super._() {
    BuiltValueNullFieldError.checkNotNull(
        referralTag, r'AmazonDto', 'referralTag');
  }

  @override
  AmazonDto rebuild(void Function(AmazonDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AmazonDtoBuilder toBuilder() => new AmazonDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AmazonDto && referralTag == other.referralTag;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, referralTag.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'AmazonDto')
          ..add('referralTag', referralTag))
        .toString();
  }
}

class AmazonDtoBuilder implements Builder<AmazonDto, AmazonDtoBuilder> {
  _$AmazonDto? _$v;

  String? _referralTag;
  String? get referralTag => _$this._referralTag;
  set referralTag(String? referralTag) => _$this._referralTag = referralTag;

  AmazonDtoBuilder() {
    AmazonDto._defaults(this);
  }

  AmazonDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _referralTag = $v.referralTag;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AmazonDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$AmazonDto;
  }

  @override
  void update(void Function(AmazonDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AmazonDto build() => _build();

  _$AmazonDto _build() {
    final _$result = _$v ??
        new _$AmazonDto._(
            referralTag: BuiltValueNullFieldError.checkNotNull(
                referralTag, r'AmazonDto', 'referralTag'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
