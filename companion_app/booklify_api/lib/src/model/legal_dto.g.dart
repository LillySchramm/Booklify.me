// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'legal_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$LegalDto extends LegalDto {
  @override
  final bool enabled;
  @override
  final String tosUrl;
  @override
  final String privacyUrl;

  factory _$LegalDto([void Function(LegalDtoBuilder)? updates]) =>
      (new LegalDtoBuilder()..update(updates))._build();

  _$LegalDto._(
      {required this.enabled, required this.tosUrl, required this.privacyUrl})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(enabled, r'LegalDto', 'enabled');
    BuiltValueNullFieldError.checkNotNull(tosUrl, r'LegalDto', 'tosUrl');
    BuiltValueNullFieldError.checkNotNull(
        privacyUrl, r'LegalDto', 'privacyUrl');
  }

  @override
  LegalDto rebuild(void Function(LegalDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  LegalDtoBuilder toBuilder() => new LegalDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is LegalDto &&
        enabled == other.enabled &&
        tosUrl == other.tosUrl &&
        privacyUrl == other.privacyUrl;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, enabled.hashCode);
    _$hash = $jc(_$hash, tosUrl.hashCode);
    _$hash = $jc(_$hash, privacyUrl.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'LegalDto')
          ..add('enabled', enabled)
          ..add('tosUrl', tosUrl)
          ..add('privacyUrl', privacyUrl))
        .toString();
  }
}

class LegalDtoBuilder implements Builder<LegalDto, LegalDtoBuilder> {
  _$LegalDto? _$v;

  bool? _enabled;
  bool? get enabled => _$this._enabled;
  set enabled(bool? enabled) => _$this._enabled = enabled;

  String? _tosUrl;
  String? get tosUrl => _$this._tosUrl;
  set tosUrl(String? tosUrl) => _$this._tosUrl = tosUrl;

  String? _privacyUrl;
  String? get privacyUrl => _$this._privacyUrl;
  set privacyUrl(String? privacyUrl) => _$this._privacyUrl = privacyUrl;

  LegalDtoBuilder() {
    LegalDto._defaults(this);
  }

  LegalDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _enabled = $v.enabled;
      _tosUrl = $v.tosUrl;
      _privacyUrl = $v.privacyUrl;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(LegalDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$LegalDto;
  }

  @override
  void update(void Function(LegalDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  LegalDto build() => _build();

  _$LegalDto _build() {
    final _$result = _$v ??
        new _$LegalDto._(
            enabled: BuiltValueNullFieldError.checkNotNull(
                enabled, r'LegalDto', 'enabled'),
            tosUrl: BuiltValueNullFieldError.checkNotNull(
                tosUrl, r'LegalDto', 'tosUrl'),
            privacyUrl: BuiltValueNullFieldError.checkNotNull(
                privacyUrl, r'LegalDto', 'privacyUrl'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
