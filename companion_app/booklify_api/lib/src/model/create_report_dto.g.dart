// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'create_report_dto.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$CreateReportDto extends CreateReportDto {
  @override
  final String category;
  @override
  final String? alternateCategory;
  @override
  final String message;
  @override
  final String targetId;

  factory _$CreateReportDto([void Function(CreateReportDtoBuilder)? updates]) =>
      (new CreateReportDtoBuilder()..update(updates))._build();

  _$CreateReportDto._(
      {required this.category,
      this.alternateCategory,
      required this.message,
      required this.targetId})
      : super._() {
    BuiltValueNullFieldError.checkNotNull(
        category, r'CreateReportDto', 'category');
    BuiltValueNullFieldError.checkNotNull(
        message, r'CreateReportDto', 'message');
    BuiltValueNullFieldError.checkNotNull(
        targetId, r'CreateReportDto', 'targetId');
  }

  @override
  CreateReportDto rebuild(void Function(CreateReportDtoBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  CreateReportDtoBuilder toBuilder() =>
      new CreateReportDtoBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is CreateReportDto &&
        category == other.category &&
        alternateCategory == other.alternateCategory &&
        message == other.message &&
        targetId == other.targetId;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, category.hashCode);
    _$hash = $jc(_$hash, alternateCategory.hashCode);
    _$hash = $jc(_$hash, message.hashCode);
    _$hash = $jc(_$hash, targetId.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'CreateReportDto')
          ..add('category', category)
          ..add('alternateCategory', alternateCategory)
          ..add('message', message)
          ..add('targetId', targetId))
        .toString();
  }
}

class CreateReportDtoBuilder
    implements Builder<CreateReportDto, CreateReportDtoBuilder> {
  _$CreateReportDto? _$v;

  String? _category;
  String? get category => _$this._category;
  set category(String? category) => _$this._category = category;

  String? _alternateCategory;
  String? get alternateCategory => _$this._alternateCategory;
  set alternateCategory(String? alternateCategory) =>
      _$this._alternateCategory = alternateCategory;

  String? _message;
  String? get message => _$this._message;
  set message(String? message) => _$this._message = message;

  String? _targetId;
  String? get targetId => _$this._targetId;
  set targetId(String? targetId) => _$this._targetId = targetId;

  CreateReportDtoBuilder() {
    CreateReportDto._defaults(this);
  }

  CreateReportDtoBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _category = $v.category;
      _alternateCategory = $v.alternateCategory;
      _message = $v.message;
      _targetId = $v.targetId;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(CreateReportDto other) {
    ArgumentError.checkNotNull(other, 'other');
    _$v = other as _$CreateReportDto;
  }

  @override
  void update(void Function(CreateReportDtoBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  CreateReportDto build() => _build();

  _$CreateReportDto _build() {
    final _$result = _$v ??
        new _$CreateReportDto._(
            category: BuiltValueNullFieldError.checkNotNull(
                category, r'CreateReportDto', 'category'),
            alternateCategory: alternateCategory,
            message: BuiltValueNullFieldError.checkNotNull(
                message, r'CreateReportDto', 'message'),
            targetId: BuiltValueNullFieldError.checkNotNull(
                targetId, r'CreateReportDto', 'targetId'));
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
