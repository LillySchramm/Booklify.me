//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'amazon_dto.g.dart';

/// AmazonDto
///
/// Properties:
/// * [referralTag]
@BuiltValue()
abstract class AmazonDto implements Built<AmazonDto, AmazonDtoBuilder> {
  @BuiltValueField(wireName: r'referralTag')
  String get referralTag;

  AmazonDto._();

  factory AmazonDto([void updates(AmazonDtoBuilder b)]) = _$AmazonDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AmazonDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AmazonDto> get serializer => _$AmazonDtoSerializer();
}

class _$AmazonDtoSerializer implements PrimitiveSerializer<AmazonDto> {
  @override
  final Iterable<Type> types = const [AmazonDto, _$AmazonDto];

  @override
  final String wireName = r'AmazonDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AmazonDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'referralTag';
    yield serializers.serialize(
      object.referralTag,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    AmazonDto object, {
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
    required AmazonDtoBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'referralTag':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.referralTag = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AmazonDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AmazonDtoBuilder();
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
