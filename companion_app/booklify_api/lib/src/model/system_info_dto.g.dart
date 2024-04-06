// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'system_info_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$SystemInfoDto extends SystemInfoDto {
  @override
  final bool signUpEnabled;
  @override
  final String cdn;
  @override
  final RecaptchaDto recaptcha;
  @override
  final LegalDto legal;
  @override
  final ReportsDto reports;
  @override
  final String version;
  @override
  final AmazonDto amazon;

  factory _$SystemInfoDto([void Function(SystemInfoDtoBuilder)? updates]) =>
      (new SystemInfoDtoBuilder()..update(updates))._build();

  _$SystemInfoDto._(
      {required this.signUpEnabled,
      required this.cdn,
      required this.recaptcha,
      required this.legal,
      required this.reports,
      required this.version,
      required this.amazon})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        signUpEnabled, r'SystemInfoDto', 'signUpEnabled');
    BuiltValueNullFieldError.checkNotNull(cdn, r'SystemInfoDto', 'cdn');
    BuiltValueNullFieldError.checkNotNull(
        recaptcha, r'SystemInfoDto', 'recaptcha');
    BuiltValueNullFieldError.checkNotNull(legal, r'SystemInfoDto', 'legal');
    BuiltValueNullFieldError.checkNotNull(reports, r'SystemInfoDto', 'reports');
    BuiltValueNullFieldError.checkNotNull(version, r'SystemInfoDto', 'version');
    BuiltValueNullFieldError.checkNotNull(amazon, r'SystemInfoDto', 'amazon');
  }

  @override
  SystemInfoDto rebuild(void Function(SystemInfoDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  SystemInfoDtoBuilder toBuilder() => new SystemInfoDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is SystemInfoDto &&
        signUpEnabled == other.signUpEnabled &&
        cdn == other.cdn &&
        recaptcha == other.recaptcha &&
        legal == other.legal &&
        reports == other.reports &&
        version == other.version &&
        amazon == other.amazon;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, signUpEnabled.hashCode);
    _$hash = $jc(_$hash, cdn.hashCode);
    _$hash = $jc(_$hash, recaptcha.hashCode);
    _$hash = $jc(_$hash, legal.hashCode);
    _$hash = $jc(_$hash, reports.hashCode);
    _$hash = $jc(_$hash, version.hashCode);
    _$hash = $jc(_$hash, amazon.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'SystemInfoDto')
          ..add('signUpEnabled', signUpEnabled)
          ..add('cdn', cdn)
          ..add('recaptcha', recaptcha)
          ..add('legal', legal)
          ..add('reports', reports)
          ..add('version', version)
          ..add('amazon', amazon))
        .toString();
  }
}

class SystemInfoDtoBuilder
    implements Builder<SystemInfoDto, SystemInfoDtoBuilder> {
  _$SystemInfoDto? _$v;

  bool? _signUpEnabled;
  bool? get signUpEnabled => _$this._signUpEnabled;
  set signUpEnabled(bool? signUpEnabled) =>
      _$this._signUpEnabled = signUpEnabled;

  String? _cdn;
  String? get cdn => _$this._cdn;
  set cdn(String? cdn) => _$this._cdn = cdn;

  RecaptchaDtoBuilder? _recaptcha;
  RecaptchaDtoBuilder get recaptcha =>
      _$this._recaptcha ??= new RecaptchaDtoBuilder();
  set recaptcha(RecaptchaDtoBuilder? recaptcha) =>
      _$this._recaptcha = recaptcha;

  LegalDtoBuilder? _legal;
  LegalDtoBuilder get legal => _$this._legal ??= new LegalDtoBuilder();
  set legal(LegalDtoBuilder? legal) => _$this._legal = legal;

  ReportsDtoBuilder? _reports;
  ReportsDtoBuilder get reports => _$this._reports ??= new ReportsDtoBuilder();
  set reports(ReportsDtoBuilder? reports) => _$this._reports = reports;

  String? _version;
  String? get version => _$this._version;
  set version(String? version) => _$this._version = version;

  AmazonDtoBuilder? _amazon;
  AmazonDtoBuilder get amazon => _$this._amazon ??= new AmazonDtoBuilder();
  set amazon(AmazonDtoBuilder? amazon) => _$this._amazon = amazon;

  SystemInfoDtoBuilder() {
    SystemInfoDto._defaults(this);
  }

  SystemInfoDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _signUpEnabled = $v.signUpEnabled;
      _cdn = $v.cdn;
      _recaptcha = $v.recaptcha.toBuilder();
      _legal = $v.legal.toBuilder();
      _reports = $v.reports.toBuilder();
      _version = $v.version;
      _amazon = $v.amazon.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(SystemInfoDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$SystemInfoDto;
  }

  @override
  void update(void Function(SystemInfoDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  SystemInfoDto build() => _build();

  _$SystemInfoDto _build() {
    _$SystemInfoDto _$result;
    try {
      _$result = _$v ??
          new _$SystemInfoDto._(
              signUpEnabled: BuiltValueNullFieldError.checkNotNull(
                  signUpEnabled, r'SystemInfoDto', 'signUpEnabled'),
              cdn: BuiltValueNullFieldError.checkNotNull(
                  cdn, r'SystemInfoDto', 'cdn'),
              recaptcha: recaptcha.build(),
              legal: legal.build(),
              reports: reports.build(),
              version: BuiltValueNullFieldError.checkNotNull(
                  version, r'SystemInfoDto', 'version'),
              amazon: amazon.build());
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'recaptcha';
        recaptcha.build();
        _$failedField = 'legal';
        legal.build();
        _$failedField = 'reports';
        reports.build();

        _$failedField = 'amazon';
        amazon.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            r'SystemInfoDto', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
