//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'system_health_dto.g.dart';

/// SystemHealthDto
///
/// Properties:
/// * [database]
/// * [s3]
@BuiltValue()
abstract class SystemHealthDto
    implements Built<SystemHealthDto, SystemHealthDtoBuilder> {
  @BuiltValueField(wireName: r'database')
  bool get database;

  @BuiltValueField(wireName: r's3')
  bool get s3;

  SystemHealthDto._();

  factory SystemHealthDto([void updates(SystemHealthDtoBuilder b)]) =
      _$SystemHealthDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(SystemHealthDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<SystemHealthDto> get serializer =>
      _$SystemHealthDtoSerializer();
}

class _$SystemHealthDtoSerializer
    implements PrimitiveSerializer<SystemHealthDto> {
  @override
  final Iterable<Type> types = const [SystemHealthDto, _$SystemHealthDto];

  @override
  final String wireName = r'SystemHealthDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    SystemHealthDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'database';
    yield serializers.serialize(
      object.database,
      specifiedType: const FullType(bool),
    );
    yield r's3';
    yield serializers.serialize(
      object.s3,
      specifiedType: const FullType(bool),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    SystemHealthDto object, {
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
    required SystemHealthDtoBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'database':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.database = valueDes;
          break;
        case r's3':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.s3 = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  SystemHealthDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = SystemHealthDtoBuilder();
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
