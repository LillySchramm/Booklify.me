// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'set_ownership_flags_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$SetOwnershipFlagsDto extends SetOwnershipFlagsDto {
  @override
  final BuiltList<String> isbns;
  @override
  final bool? hidden;
  @override
  final bool? noGroup;
  @override
  final bool? favorite;

  factory _$SetOwnershipFlagsDto(
          [void Function(SetOwnershipFlagsDtoBuilder)? updates]) =>
      (new SetOwnershipFlagsDtoBuilder()..update(updates))._build();

  _$SetOwnershipFlagsDto._(
      {required this.isbns, this.hidden, this.noGroup, this.favorite})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        isbns, r'SetOwnershipFlagsDto', 'isbns');
  }

  @override
  SetOwnershipFlagsDto rebuild(
          void Function(SetOwnershipFlagsDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  SetOwnershipFlagsDtoBuilder toBuilder() =>
      new SetOwnershipFlagsDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is SetOwnershipFlagsDto &&
        isbns == other.isbns &&
        hidden == other.hidden &&
        noGroup == other.noGroup &&
        favorite == other.favorite;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, isbns.hashCode);
    _$hash = $jc(_$hash, hidden.hashCode);
    _$hash = $jc(_$hash, noGroup.hashCode);
    _$hash = $jc(_$hash, favorite.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'SetOwnershipFlagsDto')
          ..add('isbns', isbns)
          ..add('hidden', hidden)
          ..add('noGroup', noGroup)
          ..add('favorite', favorite))
        .toString();
  }
}

class SetOwnershipFlagsDtoBuilder
    implements Builder<SetOwnershipFlagsDto, SetOwnershipFlagsDtoBuilder> {
  _$SetOwnershipFlagsDto? _$v;

  ListBuilder<String>? _isbns;
  ListBuilder<String> get isbns => _$this._isbns ??= new ListBuilder<String>();
  set isbns(ListBuilder<String>? isbns) => _$this._isbns = isbns;

  bool? _hidden;
  bool? get hidden => _$this._hidden;
  set hidden(bool? hidden) => _$this._hidden = hidden;

  bool? _noGroup;
  bool? get noGroup => _$this._noGroup;
  set noGroup(bool? noGroup) => _$this._noGroup = noGroup;

  bool? _favorite;
  bool? get favorite => _$this._favorite;
  set favorite(bool? favorite) => _$this._favorite = favorite;

  SetOwnershipFlagsDtoBuilder() {
    SetOwnershipFlagsDto._defaults(this);
  }

  SetOwnershipFlagsDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _isbns = $v.isbns.toBuilder();
      _hidden = $v.hidden;
      _noGroup = $v.noGroup;
      _favorite = $v.favorite;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(SetOwnershipFlagsDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$SetOwnershipFlagsDto;
  }

  @override
  void update(void Function(SetOwnershipFlagsDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  SetOwnershipFlagsDto build() => _build();

  _$SetOwnershipFlagsDto _build() {
    _$SetOwnershipFlagsDto _$result;
    try {
      _$result = _$v ??
          new _$SetOwnershipFlagsDto._(
              isbns: isbns.build(),
              hidden: hidden,
              noGroup: noGroup,
              favorite: favorite);
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'isbns';
        isbns.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            r'SetOwnershipFlagsDto', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
