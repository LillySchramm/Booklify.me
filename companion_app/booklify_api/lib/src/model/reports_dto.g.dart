// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'reports_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$ReportsDto extends ReportsDto {
  @override
  final bool enabled;

  factory _$ReportsDto([void Function(ReportsDtoBuilder)? updates]) =>
      (new ReportsDtoBuilder()..update(updates))._build();

  _$ReportsDto._({required this.enabled}) : super._() {
    BuiltValueNullFieldError.checkNotNull(enabled, r'ReportsDto', 'enabled');
  }

  @override
  ReportsDto rebuild(void Function(ReportsDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  ReportsDtoBuilder toBuilder() => new ReportsDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is ReportsDto && enabled == other.enabled;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, enabled.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'ReportsDto')..add('enabled', enabled))
        .toString();
  }
}

class ReportsDtoBuilder implements Builder<ReportsDto, ReportsDtoBuilder> {
  _$ReportsDto? _$v;

  bool? _enabled;
  bool? get enabled => _$this._enabled;
  set enabled(bool? enabled) => _$this._enabled = enabled;

  ReportsDtoBuilder() {
    ReportsDto._defaults(this);
  }

  ReportsDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _enabled = $v.enabled;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(ReportsDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$ReportsDto;
  }

  @override
  void update(void Function(ReportsDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  ReportsDto build() => _build();

  _$ReportsDto _build() {
    final _$result = _$v ??
        new _$ReportsDto._(
            enabled: BuiltValueNullFieldError.checkNotNull(
                enabled, r'ReportsDto', 'enabled'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
