// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'ownership_status_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

const OwnershipStatusDtoStatusEnum _$ownershipStatusDtoStatusEnum_NONE =
    const OwnershipStatusDtoStatusEnum._('NONE');
const OwnershipStatusDtoStatusEnum _$ownershipStatusDtoStatusEnum_OWNED =
    const OwnershipStatusDtoStatusEnum._('OWNED');

OwnershipStatusDtoStatusEnum _$ownershipStatusDtoStatusEnumValueOf(
    String name) {
  switch (name) {
    case 'NONE':
      return _$ownershipStatusDtoStatusEnum_NONE;
    case 'OWNED':
      return _$ownershipStatusDtoStatusEnum_OWNED;
    default:
      throw new ArgumentError(name);
  }
}

final BuiltSet<OwnershipStatusDtoStatusEnum>
    _$ownershipStatusDtoStatusEnumValues = new BuiltSet<
        OwnershipStatusDtoStatusEnum>(const <OwnershipStatusDtoStatusEnum>[
  _$ownershipStatusDtoStatusEnum_NONE,
  _$ownershipStatusDtoStatusEnum_OWNED,
]);

Serializer<OwnershipStatusDtoStatusEnum>
    _$ownershipStatusDtoStatusEnumSerializer =
    new _$OwnershipStatusDtoStatusEnumSerializer();

class _$OwnershipStatusDtoStatusEnumSerializer
    implements PrimitiveSerializer<OwnershipStatusDtoStatusEnum> {
  static const Map<String, Object> _toWire = const <String, Object>{
    'NONE': 'NONE',
    'OWNED': 'OWNED',
  };
  static const Map<Object, String> _fromWire = const <Object, String>{
    'NONE': 'NONE',
    'OWNED': 'OWNED',
  };

  @override
  final Iterable<Type> types = const <Type>[OwnershipStatusDtoStatusEnum];
  @override
  final String wireName = 'OwnershipStatusDtoStatusEnum';

  @override
  Object serialize(Serializers serializers, OwnershipStatusDtoStatusEnum object,
          {FullType specifiedType = FullType.unspecified}) =>
      _toWire[object.name] ?? object.name;

  @override
  OwnershipStatusDtoStatusEnum deserialize(
          Serializers serializers, Object serialized,
          {FullType specifiedType = FullType.unspecified}) =>
      OwnershipStatusDtoStatusEnum.valueOf(
          _fromWire[serialized] ?? (serialized is String ? serialized : ''));
}

class _$OwnershipStatusDto extends OwnershipStatusDto {
  @override
  final OwnershipStatusDtoStatusEnum status;
  @override
  final DateTime updatedAt;
  @override
  final String userId;
  @override
  final String bookIsbn;
  @override
  final String? bookGroupId;
  @override
  final bool hidden;
  @override
  final bool noGroup;
  @override
  final bool favorite;

  factory _$OwnershipStatusDto(
          [void Function(OwnershipStatusDtoBuilder)? updates]) =>
      (new OwnershipStatusDtoBuilder()..update(updates))._build();

  _$OwnershipStatusDto._(
      {required this.status,
      required this.updatedAt,
      required this.userId,
      required this.bookIsbn,
      this.bookGroupId,
      required this.hidden,
      required this.noGroup,
      required this.favorite})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        status, r'OwnershipStatusDto', 'status');
    BuiltValueNullFieldError.checkNotNull(
        updatedAt, r'OwnershipStatusDto', 'updatedAt');
    BuiltValueNullFieldError.checkNotNull(
        userId, r'OwnershipStatusDto', 'userId');
    BuiltValueNullFieldError.checkNotNull(
        bookIsbn, r'OwnershipStatusDto', 'bookIsbn');
    BuiltValueNullFieldError.checkNotNull(
        hidden, r'OwnershipStatusDto', 'hidden');
    BuiltValueNullFieldError.checkNotNull(
        noGroup, r'OwnershipStatusDto', 'noGroup');
    BuiltValueNullFieldError.checkNotNull(
        favorite, r'OwnershipStatusDto', 'favorite');
  }

  @override
  OwnershipStatusDto rebuild(
          void Function(OwnershipStatusDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  OwnershipStatusDtoBuilder toBuilder() =>
      new OwnershipStatusDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is OwnershipStatusDto &&
        status == other.status &&
        updatedAt == other.updatedAt &&
        userId == other.userId &&
        bookIsbn == other.bookIsbn &&
        bookGroupId == other.bookGroupId &&
        hidden == other.hidden &&
        noGroup == other.noGroup &&
        favorite == other.favorite;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, status.hashCode);
    _$hash = $jc(_$hash, updatedAt.hashCode);
    _$hash = $jc(_$hash, userId.hashCode);
    _$hash = $jc(_$hash, bookIsbn.hashCode);
    _$hash = $jc(_$hash, bookGroupId.hashCode);
    _$hash = $jc(_$hash, hidden.hashCode);
    _$hash = $jc(_$hash, noGroup.hashCode);
    _$hash = $jc(_$hash, favorite.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'OwnershipStatusDto')
          ..add('status', status)
          ..add('updatedAt', updatedAt)
          ..add('userId', userId)
          ..add('bookIsbn', bookIsbn)
          ..add('bookGroupId', bookGroupId)
          ..add('hidden', hidden)
          ..add('noGroup', noGroup)
          ..add('favorite', favorite))
        .toString();
  }
}

class OwnershipStatusDtoBuilder
    implements Builder<OwnershipStatusDto, OwnershipStatusDtoBuilder> {
  _$OwnershipStatusDto? _$v;

  OwnershipStatusDtoStatusEnum? _status;
  OwnershipStatusDtoStatusEnum? get status => _$this._status;
  set status(OwnershipStatusDtoStatusEnum? status) => _$this._status = status;

  DateTime? _updatedAt;
  DateTime? get updatedAt => _$this._updatedAt;
  set updatedAt(DateTime? updatedAt) => _$this._updatedAt = updatedAt;

  String? _userId;
  String? get userId => _$this._userId;
  set userId(String? userId) => _$this._userId = userId;

  String? _bookIsbn;
  String? get bookIsbn => _$this._bookIsbn;
  set bookIsbn(String? bookIsbn) => _$this._bookIsbn = bookIsbn;

  String? _bookGroupId;
  String? get bookGroupId => _$this._bookGroupId;
  set bookGroupId(String? bookGroupId) => _$this._bookGroupId = bookGroupId;

  bool? _hidden;
  bool? get hidden => _$this._hidden;
  set hidden(bool? hidden) => _$this._hidden = hidden;

  bool? _noGroup;
  bool? get noGroup => _$this._noGroup;
  set noGroup(bool? noGroup) => _$this._noGroup = noGroup;

  bool? _favorite;
  bool? get favorite => _$this._favorite;
  set favorite(bool? favorite) => _$this._favorite = favorite;

  OwnershipStatusDtoBuilder() {
    OwnershipStatusDto._defaults(this);
  }

  OwnershipStatusDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _status = $v.status;
      _updatedAt = $v.updatedAt;
      _userId = $v.userId;
      _bookIsbn = $v.bookIsbn;
      _bookGroupId = $v.bookGroupId;
      _hidden = $v.hidden;
      _noGroup = $v.noGroup;
      _favorite = $v.favorite;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(OwnershipStatusDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$OwnershipStatusDto;
  }

  @override
  void update(void Function(OwnershipStatusDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  OwnershipStatusDto build() => _build();

  _$OwnershipStatusDto _build() {
    final _$result = _$v ??
        new _$OwnershipStatusDto._(
            status: BuiltValueNullFieldError.checkNotNull(
                status, r'OwnershipStatusDto', 'status'),
            updatedAt: BuiltValueNullFieldError.checkNotNull(
                updatedAt, r'OwnershipStatusDto', 'updatedAt'),
            userId: BuiltValueNullFieldError.checkNotNull(
                userId, r'OwnershipStatusDto', 'userId'),
            bookIsbn: BuiltValueNullFieldError.checkNotNull(
                bookIsbn, r'OwnershipStatusDto', 'bookIsbn'),
            bookGroupId: bookGroupId,
            hidden: BuiltValueNullFieldError.checkNotNull(
                hidden, r'OwnershipStatusDto', 'hidden'),
            noGroup: BuiltValueNullFieldError.checkNotNull(
                noGroup, r'OwnershipStatusDto', 'noGroup'),
            favorite: BuiltValueNullFieldError.checkNotNull(
                favorite, r'OwnershipStatusDto', 'favorite'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
