//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'set_ownership_status_dto.g.dart';

/// SetOwnershipStatusDto
///
/// Properties:
/// * [status]
/// * [bookGroupId]
/// * [hidden]
/// * [noGroup]
@BuiltValue()
abstract class SetOwnershipStatusDto
    implements Built<SetOwnershipStatusDto, SetOwnershipStatusDtoBuilder> {
  @BuiltValueField(wireName: r'status')
  SetOwnershipStatusDtoStatusEnum get status;
  // enum statusEnum {  NONE,  OWNED,  };

  @BuiltValueField(wireName: r'bookGroupId')
  String? get bookGroupId;

  @BuiltValueField(wireName: r'hidden')
  bool? get hidden;

  @BuiltValueField(wireName: r'noGroup')
  bool? get noGroup;

  SetOwnershipStatusDto._();

  factory SetOwnershipStatusDto(
      [void updates(SetOwnershipStatusDtoBuilder b)]) = _$SetOwnershipStatusDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(SetOwnershipStatusDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<SetOwnershipStatusDto> get serializer =>
      _$SetOwnershipStatusDtoSerializer();
}

class _$SetOwnershipStatusDtoSerializer
    implements PrimitiveSerializer<SetOwnershipStatusDto> {
  @override
  final Iterable<Type> types = const [
    SetOwnershipStatusDto,
    _$SetOwnershipStatusDto
  ];

  @override
  final String wireName = r'SetOwnershipStatusDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    SetOwnershipStatusDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'status';
    yield serializers.serialize(
      object.status,
      specifiedType: const FullType(SetOwnershipStatusDtoStatusEnum),
    );
    yield r'bookGroupId';
    yield object.bookGroupId == null
        ? null
        : serializers.serialize(
            object.bookGroupId,
            specifiedType: const FullType.nullable(String),
          );
    if (object.hidden != null) {
      yield r'hidden';
      yield serializers.serialize(
        object.hidden,
        specifiedType: const FullType(bool),
      );
    }
    if (object.noGroup != null) {
      yield r'noGroup';
      yield serializers.serialize(
        object.noGroup,
        specifiedType: const FullType(bool),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    SetOwnershipStatusDto object, {
    FullType specifiedType = FullType.unspecified,
  }) {
    return _serializeProperties(serializers, object,
            specifiedType: specifiedType)
        .toList();
  }

  void _deserializeProperties(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
    required List<Object?> serializedList,
    required SetOwnershipStatusDtoBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(SetOwnershipStatusDtoStatusEnum),
          ) as SetOwnershipStatusDtoStatusEnum;
          result.status = valueDes;
          break;
        case r'bookGroupId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(String),
          ) as String?;
          if (valueDes == null) continue;
          result.bookGroupId = valueDes;
          break;
        case r'hidden':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.hidden = valueDes;
          break;
        case r'noGroup':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.noGroup = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  SetOwnershipStatusDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = SetOwnershipStatusDtoBuilder();
    final serializedList = (serialized as Iterable<Object?>).toList();
    final unhandled = <Object?>[];
    _deserializeProperties(
      serializers,
      serialized,
      specifiedType: specifiedType,
      serializedList: serializedList,
      unhandled: unhandled,
      result: result,
    );
    return result.build();
  }
}

class SetOwnershipStatusDtoStatusEnum extends EnumClass {
  @BuiltValueEnumConst(wireName: r'NONE')
  static const SetOwnershipStatusDtoStatusEnum NONE =
      _$setOwnershipStatusDtoStatusEnum_NONE;
  @BuiltValueEnumConst(wireName: r'OWNED')
  static const SetOwnershipStatusDtoStatusEnum OWNED =
      _$setOwnershipStatusDtoStatusEnum_OWNED;

  static Serializer<SetOwnershipStatusDtoStatusEnum> get serializer =>
      _$setOwnershipStatusDtoStatusEnumSerializer;

  const SetOwnershipStatusDtoStatusEnum._(String name) : super(name);

  static BuiltSet<SetOwnershipStatusDtoStatusEnum> get values =>
      _$setOwnershipStatusDtoStatusEnumValues;
  static SetOwnershipStatusDtoStatusEnum valueOf(String name) =>
      _$setOwnershipStatusDtoStatusEnumValueOf(name);
}
