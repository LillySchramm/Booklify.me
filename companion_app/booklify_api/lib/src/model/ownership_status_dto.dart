//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'ownership_status_dto.g.dart';

/// OwnershipStatusDto
///
/// Properties:
/// * [status]
/// * [updatedAt]
/// * [userId]
/// * [bookIsbn]
/// * [bookGroupId]
/// * [hidden]
/// * [noGroup]
/// * [favorite]
@BuiltValue()
abstract class OwnershipStatusDto
    implements Built<OwnershipStatusDto, OwnershipStatusDtoBuilder> {
  @BuiltValueField(wireName: r'status')
  OwnershipStatusDtoStatusEnum get status;
  // enum statusEnum {  NONE,  OWNED,  };

  @BuiltValueField(wireName: r'updatedAt')
  DateTime get updatedAt;

  @BuiltValueField(wireName: r'userId')
  String get userId;

  @BuiltValueField(wireName: r'bookIsbn')
  String get bookIsbn;

  @BuiltValueField(wireName: r'bookGroupId')
  String? get bookGroupId;

  @BuiltValueField(wireName: r'hidden')
  bool get hidden;

  @BuiltValueField(wireName: r'noGroup')
  bool get noGroup;

  @BuiltValueField(wireName: r'favorite')
  bool get favorite;

  OwnershipStatusDto._();

  factory OwnershipStatusDto([void updates(OwnershipStatusDtoBuilder b)]) =
      _$OwnershipStatusDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(OwnershipStatusDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<OwnershipStatusDto> get serializer =>
      _$OwnershipStatusDtoSerializer();
}

class _$OwnershipStatusDtoSerializer
    implements PrimitiveSerializer<OwnershipStatusDto> {
  @override
  final Iterable<Type> types = const [OwnershipStatusDto, _$OwnershipStatusDto];

  @override
  final String wireName = r'OwnershipStatusDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    OwnershipStatusDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'status';
    yield serializers.serialize(
      object.status,
      specifiedType: const FullType(OwnershipStatusDtoStatusEnum),
    );
    yield r'updatedAt';
    yield serializers.serialize(
      object.updatedAt,
      specifiedType: const FullType(DateTime),
    );
    yield r'userId';
    yield serializers.serialize(
      object.userId,
      specifiedType: const FullType(String),
    );
    yield r'bookIsbn';
    yield serializers.serialize(
      object.bookIsbn,
      specifiedType: const FullType(String),
    );
    yield r'bookGroupId';
    yield object.bookGroupId == null
        ? null
        : serializers.serialize(
            object.bookGroupId,
            specifiedType: const FullType.nullable(String),
          );
    yield r'hidden';
    yield serializers.serialize(
      object.hidden,
      specifiedType: const FullType(bool),
    );
    yield r'noGroup';
    yield serializers.serialize(
      object.noGroup,
      specifiedType: const FullType(bool),
    );
    yield r'favorite';
    yield serializers.serialize(
      object.favorite,
      specifiedType: const FullType(bool),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    OwnershipStatusDto object, {
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
    required OwnershipStatusDtoBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'status':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(OwnershipStatusDtoStatusEnum),
          ) as OwnershipStatusDtoStatusEnum;
          result.status = valueDes;
          break;
        case r'updatedAt':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.updatedAt = valueDes;
          break;
        case r'userId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.userId = valueDes;
          break;
        case r'bookIsbn':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.bookIsbn = valueDes;
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
        case r'favorite':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.favorite = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  OwnershipStatusDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = OwnershipStatusDtoBuilder();
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

class OwnershipStatusDtoStatusEnum extends EnumClass {
  @BuiltValueEnumConst(wireName: r'NONE')
  static const OwnershipStatusDtoStatusEnum NONE =
      _$ownershipStatusDtoStatusEnum_NONE;
  @BuiltValueEnumConst(wireName: r'OWNED')
  static const OwnershipStatusDtoStatusEnum OWNED =
      _$ownershipStatusDtoStatusEnum_OWNED;

  static Serializer<OwnershipStatusDtoStatusEnum> get serializer =>
      _$ownershipStatusDtoStatusEnumSerializer;

  const OwnershipStatusDtoStatusEnum._(String name) : super(name);

  static BuiltSet<OwnershipStatusDtoStatusEnum> get values =>
      _$ownershipStatusDtoStatusEnumValues;
  static OwnershipStatusDtoStatusEnum valueOf(String name) =>
      _$ownershipStatusDtoStatusEnumValueOf(name);
}
