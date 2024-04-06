// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'session_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$SessionDto extends SessionDto {
  @override
  final String id;
  @override
  final String userId;
  @override
  final String name;
  @override
  final DateTime createdAt;
  @override
  final bool permanent;
  @override
  final DateTime? lastUsed;

  factory _$SessionDto([void Function(SessionDtoBuilder)? updates]) =>
      (new SessionDtoBuilder()..update(updates))._build();

  _$SessionDto._(
      {required this.id,
      required this.userId,
      required this.name,
      required this.createdAt,
      required this.permanent,
      this.lastUsed})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(id, r'SessionDto', 'id');
    BuiltValueNullFieldError.checkNotNull(userId, r'SessionDto', 'userId');
    BuiltValueNullFieldError.checkNotNull(name, r'SessionDto', 'name');
    BuiltValueNullFieldError.checkNotNull(
        createdAt, r'SessionDto', 'createdAt');
    BuiltValueNullFieldError.checkNotNull(
        permanent, r'SessionDto', 'permanent');
  }

  @override
  SessionDto rebuild(void Function(SessionDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  SessionDtoBuilder toBuilder() => new SessionDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is SessionDto &&
        id == other.id &&
        userId == other.userId &&
        name == other.name &&
        createdAt == other.createdAt &&
        permanent == other.permanent &&
        lastUsed == other.lastUsed;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, userId.hashCode);
    _$hash = $jc(_$hash, name.hashCode);
    _$hash = $jc(_$hash, createdAt.hashCode);
    _$hash = $jc(_$hash, permanent.hashCode);
    _$hash = $jc(_$hash, lastUsed.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'SessionDto')
          ..add('id', id)
          ..add('userId', userId)
          ..add('name', name)
          ..add('createdAt', createdAt)
          ..add('permanent', permanent)
          ..add('lastUsed', lastUsed))
        .toString();
  }
}

class SessionDtoBuilder implements Builder<SessionDto, SessionDtoBuilder> {
  _$SessionDto? _$v;

  String? _id;
  String? get id => _$this._id;
  set id(String? id) => _$this._id = id;

  String? _userId;
  String? get userId => _$this._userId;
  set userId(String? userId) => _$this._userId = userId;

  String? _name;
  String? get name => _$this._name;
  set name(String? name) => _$this._name = name;

  DateTime? _createdAt;
  DateTime? get createdAt => _$this._createdAt;
  set createdAt(DateTime? createdAt) => _$this._createdAt = createdAt;

  bool? _permanent;
  bool? get permanent => _$this._permanent;
  set permanent(bool? permanent) => _$this._permanent = permanent;

  DateTime? _lastUsed;
  DateTime? get lastUsed => _$this._lastUsed;
  set lastUsed(DateTime? lastUsed) => _$this._lastUsed = lastUsed;

  SessionDtoBuilder() {
    SessionDto._defaults(this);
  }

  SessionDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _userId = $v.userId;
      _name = $v.name;
      _createdAt = $v.createdAt;
      _permanent = $v.permanent;
      _lastUsed = $v.lastUsed;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(SessionDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$SessionDto;
  }

  @override
  void update(void Function(SessionDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  SessionDto build() => _build();

  _$SessionDto _build() {
    final _$result = _$v ??
        new _$SessionDto._(
            id: BuiltValueNullFieldError.checkNotNull(id, r'SessionDto', 'id'),
            userId: BuiltValueNullFieldError.checkNotNull(
                userId, r'SessionDto', 'userId'),
            name: BuiltValueNullFieldError.checkNotNull(
                name, r'SessionDto', 'name'),
            createdAt: BuiltValueNullFieldError.checkNotNull(
                createdAt, r'SessionDto', 'createdAt'),
            permanent: BuiltValueNullFieldError.checkNotNull(
                permanent, r'SessionDto', 'permanent'),
            lastUsed: lastUsed);
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
