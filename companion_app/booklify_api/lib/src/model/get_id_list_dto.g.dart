// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'get_id_list_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$GetIdListDto extends GetIdListDto {
  @override
  final BuiltList<String> ids;

  factory _$GetIdListDto([void Function(GetIdListDtoBuilder)? updates]) =>
      (new GetIdListDtoBuilder()..update(updates))._build();

  _$GetIdListDto._({required this.ids}) : super._() {
    BuiltValueNullFieldError.checkNotNull(ids, r'GetIdListDto', 'ids');
  }

  @override
  GetIdListDto rebuild(void Function(GetIdListDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  GetIdListDtoBuilder toBuilder() => new GetIdListDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is GetIdListDto && ids == other.ids;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, ids.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'GetIdListDto')..add('ids', ids))
        .toString();
  }
}

class GetIdListDtoBuilder
    implements Builder<GetIdListDto, GetIdListDtoBuilder> {
  _$GetIdListDto? _$v;

  ListBuilder<String>? _ids;
  ListBuilder<String> get ids => _$this._ids ??= new ListBuilder<String>();
  set ids(ListBuilder<String>? ids) => _$this._ids = ids;

  GetIdListDtoBuilder() {
    GetIdListDto._defaults(this);
  }

  GetIdListDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _ids = $v.ids.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(GetIdListDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$GetIdListDto;
  }

  @override
  void update(void Function(GetIdListDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  GetIdListDto build() => _build();

  _$GetIdListDto _build() {
    _$GetIdListDto _$result;
    try {
      _$result = _$v ?? new _$GetIdListDto._(ids: ids.build());
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'ids';
        ids.build();
      } catch (e) {
        throw new BuiltValueNestedFieldError(
            r'GetIdListDto', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
