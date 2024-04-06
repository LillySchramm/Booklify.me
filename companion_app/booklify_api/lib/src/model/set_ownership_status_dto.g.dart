// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'set_ownership_status_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const SetOwnershipStatusDtoStatusEnum _$setOwnershipStatusDtoStatusEnum_NONE =
    const SetOwnershipStatusDtoStatusEnum._('NONE');
const SetOwnershipStatusDtoStatusEnum _$setOwnershipStatusDtoStatusEnum_OWNED =
    const SetOwnershipStatusDtoStatusEnum._('OWNED');

SetOwnershipStatusDtoStatusEnum _$setOwnershipStatusDtoStatusEnumValueOf(
    String name) {
  switch (name) {
    case 'NONE':
      return _$setOwnershipStatusDtoStatusEnum_NONE;
    case 'OWNED':
      return _$setOwnershipStatusDtoStatusEnum_OWNED;
    default:
      throw new ArgumentError(name);
  }
}

final BuiltSet<SetOwnershipStatusDtoStatusEnum>
    _$setOwnershipStatusDtoStatusEnumValues = new BuiltSet<
        SetOwnershipStatusDtoStatusEnum>(const <SetOwnershipStatusDtoStatusEnum>[
  _$setOwnershipStatusDtoStatusEnum_NONE,
  _$setOwnershipStatusDtoStatusEnum_OWNED,
]);

Serializer<SetOwnershipStatusDtoStatusEnum>
    _$setOwnershipStatusDtoStatusEnumSerializer =
    new _$SetOwnershipStatusDtoStatusEnumSerializer();

class _$SetOwnershipStatusDtoStatusEnumSerializer
    implements PrimitiveSerializer<SetOwnershipStatusDtoStatusEnum> {
  static const Map<String, Object> _toWire = const <String, Object>{
    'NONE': 'NONE',
    'OWNED': 'OWNED',
  };
  static const Map<Object, String> _fromWire = const <Object, String>{
    'NONE': 'NONE',
    'OWNED': 'OWNED',
  };

  @override
  final Iterable<Type> types = const <Type>[SetOwnershipStatusDtoStatusEnum];
  @override
  final String wireName = 'SetOwnershipStatusDtoStatusEnum';

  @override
  Object serialize(
          Serializers serializers, SetOwnershipStatusDtoStatusEnum object,
          {FullType specifiedType = FullType.unspecified}) =>
      _toWire[object.name] ?? object.name;

  @override
  SetOwnershipStatusDtoStatusEnum deserialize(
          Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      SetOwnershipStatusDtoStatusEnum.valueOf(
          _fromWire[serialized] ?? (serialized is String ? serialized : ''));
}

class _$SetOwnershipStatusDto extends SetOwnershipStatusDto {
  @override
  final SetOwnershipStatusDtoStatusEnum status;
  @override
  final String? bookGroupId;
  @override
  final bool? hidden;
  @override
  final bool? noGroup;

  factory _$SetOwnershipStatusDto(
          [void Function(SetOwnershipStatusDtoBuilder)? updates]) =>
      (new SetOwnershipStatusDtoBuilder()..update(updates))._build();

  _$SetOwnershipStatusDto._(
      {required this.status, this.bookGroupId, this.hidden, this.noGroup})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        status, r'SetOwnershipStatusDto', 'status');
  }

  @override
  SetOwnershipStatusDto rebuild(
          void Function(SetOwnershipStatusDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  SetOwnershipStatusDtoBuilder toBuilder() =>
      new SetOwnershipStatusDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is SetOwnershipStatusDto &&
        status == other.status &&
        bookGroupId == other.bookGroupId &&
        hidden == other.hidden &&
        noGroup == other.noGroup;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, status.hashCode);
    _$hash = $jc(_$hash, bookGroupId.hashCode);
    _$hash = $jc(_$hash, hidden.hashCode);
    _$hash = $jc(_$hash, noGroup.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'SetOwnershipStatusDto')
          ..add('status', status)
          ..add('bookGroupId', bookGroupId)
          ..add('hidden', hidden)
          ..add('noGroup', noGroup))
        .toString();
  }
}

class SetOwnershipStatusDtoBuilder
    implements Builder<SetOwnershipStatusDto, SetOwnershipStatusDtoBuilder> {
  _$SetOwnershipStatusDto? _$v;

  SetOwnershipStatusDtoStatusEnum? _status;
  SetOwnershipStatusDtoStatusEnum? get status => _$this._status;
  set status(SetOwnershipStatusDtoStatusEnum? status) =>
      _$this._status = status;

  String? _bookGroupId;
  String? get bookGroupId => _$this._bookGroupId;
  set bookGroupId(String? bookGroupId) => _$this._bookGroupId = bookGroupId;

  bool? _hidden;
  bool? get hidden => _$this._hidden;
  set hidden(bool? hidden) => _$this._hidden = hidden;

  bool? _noGroup;
  bool? get noGroup => _$this._noGroup;
  set noGroup(bool? noGroup) => _$this._noGroup = noGroup;

  SetOwnershipStatusDtoBuilder() {
    SetOwnershipStatusDto._defaults(this);
  }

  SetOwnershipStatusDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _status = $v.status;
      _bookGroupId = $v.bookGroupId;
      _hidden = $v.hidden;
      _noGroup = $v.noGroup;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(SetOwnershipStatusDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$SetOwnershipStatusDto;
  }

  @override
  void update(void Function(SetOwnershipStatusDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  SetOwnershipStatusDto build() => _build();

  _$SetOwnershipStatusDto _build() {
    final _$result = _$v ??
        new _$SetOwnershipStatusDto._(
            status: BuiltValueNullFieldError.checkNotNull(
                status, r'SetOwnershipStatusDto', 'status'),
            bookGroupId: bookGroupId,
            hidden: hidden,
            noGroup: noGroup);
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
