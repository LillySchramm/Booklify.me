// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'system_health_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$SystemHealthDto extends SystemHealthDto {
  @override
  final bool database;
  @override
  final bool s3;

  factory _$SystemHealthDto([void Function(SystemHealthDtoBuilder)? updates]) =>
      (new SystemHealthDtoBuilder()..update(updates))._build();

  _$SystemHealthDto._({required this.database, required this.s3}) : super._() {
    BuiltValueNullFieldError.checkNotNull(
        database, r'SystemHealthDto', 'database');
    BuiltValueNullFieldError.checkNotNull(s3, r'SystemHealthDto', 's3');
  }

  @override
  SystemHealthDto rebuild(void Function(SystemHealthDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  SystemHealthDtoBuilder toBuilder() =>
      new SystemHealthDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is SystemHealthDto &&
        database == other.database &&
        s3 == other.s3;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, database.hashCode);
    _$hash = $jc(_$hash, s3.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'SystemHealthDto')
          ..add('database', database)
          ..add('s3', s3))
        .toString();
  }
}

class SystemHealthDtoBuilder
    implements Builder<SystemHealthDto, SystemHealthDtoBuilder> {
  _$SystemHealthDto? _$v;

  bool? _database;
  bool? get database => _$this._database;
  set database(bool? database) => _$this._database = database;

  bool? _s3;
  bool? get s3 => _$this._s3;
  set s3(bool? s3) => _$this._s3 = s3;

  SystemHealthDtoBuilder() {
    SystemHealthDto._defaults(this);
  }

  SystemHealthDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _database = $v.database;
      _s3 = $v.s3;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(SystemHealthDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$SystemHealthDto;
  }

  @override
  void update(void Function(SystemHealthDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  SystemHealthDto build() => _build();

  _$SystemHealthDto _build() {
    final _$result = _$v ??
        new _$SystemHealthDto._(
            database: BuiltValueNullFieldError.checkNotNull(
                database, r'SystemHealthDto', 'database'),
            s3: BuiltValueNullFieldError.checkNotNull(
                s3, r'SystemHealthDto', 's3'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
