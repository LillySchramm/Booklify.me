//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'identifier_dto.g.dart';

/// IdentifierDto
///
/// Properties:
/// * [id]
@BuiltValue()
abstract class IdentifierDto
    implements Built<IdentifierDto, IdentifierDtoBuilder> {
  @BuiltValueField(wireName: r'id')
  String get id;

  IdentifierDto._();

  factory IdentifierDto([void updates(IdentifierDtoBuilder b)]) =
      _$IdentifierDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(IdentifierDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<IdentifierDto> get serializer =>
      _$IdentifierDtoSerializer();
}

class _$IdentifierDtoSerializer implements PrimitiveSerializer<IdentifierDto> {
  @override
  final Iterable<Type> types = const [IdentifierDto, _$IdentifierDto];

  @override
  final String wireName = r'IdentifierDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    IdentifierDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'id';
    yield serializers.serialize(
      object.id,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    IdentifierDto object, {
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
    required IdentifierDtoBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'id':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.id = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  IdentifierDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = IdentifierDtoBuilder();
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
