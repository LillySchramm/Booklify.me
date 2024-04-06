// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'recaptcha_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$RecaptchaDto extends RecaptchaDto {
  @override
  final bool enabled;
  @override
  final String siteKey;

  factory _$RecaptchaDto([void Function(RecaptchaDtoBuilder)? updates]) =>
      (new RecaptchaDtoBuilder()..update(updates))._build();

  _$RecaptchaDto._({required this.enabled, required this.siteKey}) : super._() {
    BuiltValueNullFieldError.checkNotNull(enabled, r'RecaptchaDto', 'enabled');
    BuiltValueNullFieldError.checkNotNull(siteKey, r'RecaptchaDto', 'siteKey');
  }

  @override
  RecaptchaDto rebuild(void Function(RecaptchaDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  RecaptchaDtoBuilder toBuilder() => new RecaptchaDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is RecaptchaDto &&
        enabled == other.enabled &&
        siteKey == other.siteKey;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, enabled.hashCode);
    _$hash = $jc(_$hash, siteKey.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'RecaptchaDto')
          ..add('enabled', enabled)
          ..add('siteKey', siteKey))
        .toString();
  }
}

class RecaptchaDtoBuilder
    implements Builder<RecaptchaDto, RecaptchaDtoBuilder> {
  _$RecaptchaDto? _$v;

  bool? _enabled;
  bool? get enabled => _$this._enabled;
  set enabled(bool? enabled) => _$this._enabled = enabled;

  String? _siteKey;
  String? get siteKey => _$this._siteKey;
  set siteKey(String? siteKey) => _$this._siteKey = siteKey;

  RecaptchaDtoBuilder() {
    RecaptchaDto._defaults(this);
  }

  RecaptchaDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _enabled = $v.enabled;
      _siteKey = $v.siteKey;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(RecaptchaDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$RecaptchaDto;
  }

  @override
  void update(void Function(RecaptchaDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  RecaptchaDto build() => _build();

  _$RecaptchaDto _build() {
    final _$result = _$v ??
        new _$RecaptchaDto._(
            enabled: BuiltValueNullFieldError.checkNotNull(
                enabled, r'RecaptchaDto', 'enabled'),
            siteKey: BuiltValueNullFieldError.checkNotNull(
                siteKey, r'RecaptchaDto', 'siteKey'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
