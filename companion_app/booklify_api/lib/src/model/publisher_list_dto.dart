//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:booklify_api/src/model/publisher_dto.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'publisher_list_dto.g.dart';

/// PublisherListDto
///
/// Properties:
/// * [publishers]
@BuiltValue()
abstract class PublisherListDto
    implements Built<PublisherListDto, PublisherListDtoBuilder> {
  @BuiltValueField(wireName: r'publishers')
  BuiltList<PublisherDto> get publishers;

  PublisherListDto._();

  factory PublisherListDto([void updates(PublisherListDtoBuilder b)]) =
      _$PublisherListDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(PublisherListDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<PublisherListDto> get serializer =>
      _$PublisherListDtoSerializer();
}

class _$PublisherListDtoSerializer
    implements PrimitiveSerializer<PublisherListDto> {
  @override
  final Iterable<Type> types = const [PublisherListDto, _$PublisherListDto];

  @override
  final String wireName = r'PublisherListDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    PublisherListDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'publishers';
    yield serializers.serialize(
      object.publishers,
      specifiedType: const FullType(BuiltList, [FullType(PublisherDto)]),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    PublisherListDto object, {
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
    required PublisherListDtoBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'publishers':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(PublisherDto)]),
          ) as BuiltList<PublisherDto>;
          result.publishers.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  PublisherListDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = PublisherListDtoBuilder();
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
