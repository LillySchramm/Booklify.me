// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'session_list_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$SessionListDto extends SessionListDto {
  @override
  final BuiltList<SessionDto> sessions;

  factory _$SessionListDto([void Function(SessionListDtoBuilder)? updates]) =>
      (new SessionListDtoBuilder()..update(updates))._build();

  _$SessionListDto._({required this.sessions}) : super._() {
    BuiltValueNullFieldError.checkNotNull(
        sessions, r'SessionListDto', 'sessions');
  }

  @override
  SessionListDto rebuild(void Function(SessionListDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  SessionListDtoBuilder toBuilder() =>
      new SessionListDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is SessionListDto && sessions == other.sessions;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, sessions.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'SessionListDto')
          ..add('sessions', sessions))
        .toString();
  }
}

class SessionListDtoBuilder
    implements Builder<SessionListDto, SessionListDtoBuilder> {
  _$SessionListDto? _$v;

  ListBuilder<SessionDto>? _sessions;
  ListBuilder<SessionDto> get sessions =>
      _$this._sessions ??= new ListBuilder<SessionDto>();
  set sessions(ListBuilder<SessionDto>? sessions) =>
      _$this._sessions = sessions;

  SessionListDtoBuilder() {
    SessionListDto._defaults(this);
  }

  SessionListDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _sessions = $v.sessions.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(SessionListDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$SessionListDto;
  }

  @override
  void update(void Function(SessionListDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  SessionListDto build() => _build();

  _$SessionListDto _build() {
    _$SessionListDto _$result;
    try {
      _$result = _$v ?? new _$SessionListDto._(sessions: sessions.build());
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'sessions';
        sessions.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            r'SessionListDto', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
