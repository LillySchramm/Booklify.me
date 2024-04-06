// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'reset_password_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$ResetPasswordDto extends ResetPasswordDto {
  @override
  final String id;

  factory _$ResetPasswordDto(
          [void Function(ResetPasswordDtoBuilder)? updates]) =>
      (new ResetPasswordDtoBuilder()..update(updates))._build();

  _$ResetPasswordDto._({required this.id}) : super._() {
    BuiltValueNullFieldError.checkNotNull(id, r'ResetPasswordDto', 'id');
  }

  @override
  ResetPasswordDto rebuild(void Function(ResetPasswordDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  ResetPasswordDtoBuilder toBuilder() =>
      new ResetPasswordDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is ResetPasswordDto && id == other.id;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'ResetPasswordDto')..add('id', id))
        .toString();
  }
}

class ResetPasswordDtoBuilder
    implements Builder<ResetPasswordDto, ResetPasswordDtoBuilder> {
  _$ResetPasswordDto? _$v;

  String? _id;
  String? get id => _$this._id;
  set id(String? id) => _$this._id = id;

  ResetPasswordDtoBuilder() {
    ResetPasswordDto._defaults(this);
  }

  ResetPasswordDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(ResetPasswordDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$ResetPasswordDto;
  }

  @override
  void update(void Function(ResetPasswordDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  ResetPasswordDto build() => _build();

  _$ResetPasswordDto _build() {
    final _$result = _$v ??
        new _$ResetPasswordDto._(
            id: BuiltValueNullFieldError.checkNotNull(
                id, r'ResetPasswordDto', 'id'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
