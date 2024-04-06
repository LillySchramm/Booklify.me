//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'set_ownership_flags_dto.g.dart';

/// SetOwnershipFlagsDto
///
/// Properties:
/// * [isbns]
/// * [hidden]
/// * [noGroup]
/// * [favorite]
@BuiltValue()
abstract class SetOwnershipFlagsDto
    implements Built<SetOwnershipFlagsDto, SetOwnershipFlagsDtoBuilder> {
  @BuiltValueField(wireName: r'isbns')
  BuiltList<String> get isbns;

  @BuiltValueField(wireName: r'hidden')
  bool? get hidden;

  @BuiltValueField(wireName: r'noGroup')
  bool? get noGroup;

  @BuiltValueField(wireName: r'favorite')
  bool? get favorite;

  SetOwnershipFlagsDto._();

  factory SetOwnershipFlagsDto([void updates(SetOwnershipFlagsDtoBuilder b)]) =
      _$SetOwnershipFlagsDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(SetOwnershipFlagsDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<SetOwnershipFlagsDto> get serializer =>
      _$SetOwnershipFlagsDtoSerializer();
}

class _$SetOwnershipFlagsDtoSerializer
    implements PrimitiveSerializer<SetOwnershipFlagsDto> {
  @override
  final Iterable<Type> types = const [
    SetOwnershipFlagsDto,
    _$SetOwnershipFlagsDto
  ];

  @override
  final String wireName = r'SetOwnershipFlagsDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    SetOwnershipFlagsDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'isbns';
    yield serializers.serialize(
      object.isbns,
      specifiedType: const FullType(BuiltList, [FullType(String)]),
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
    if (object.favorite != null) {
      yield r'favorite';
      yield serializers.serialize(
        object.favorite,
        specifiedType: const FullType(bool),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    SetOwnershipFlagsDto object, {
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
    required SetOwnershipFlagsDtoBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'isbns':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.isbns.replace(valueDes);
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
  SetOwnershipFlagsDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = SetOwnershipFlagsDtoBuilder();
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
