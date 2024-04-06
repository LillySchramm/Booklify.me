//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'book_group_post_dto.g.dart';

/// BookGroupPostDto
///
/// Properties:
/// * [name]
@BuiltValue()
abstract class BookGroupPostDto
    implements Built<BookGroupPostDto, BookGroupPostDtoBuilder> {
  @BuiltValueField(wireName: r'name')
  String get name;

  BookGroupPostDto._();

  factory BookGroupPostDto([void updates(BookGroupPostDtoBuilder b)]) =
      _$BookGroupPostDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(BookGroupPostDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<BookGroupPostDto> get serializer =>
      _$BookGroupPostDtoSerializer();
}

class _$BookGroupPostDtoSerializer
    implements PrimitiveSerializer<BookGroupPostDto> {
  @override
  final Iterable<Type> types = const [BookGroupPostDto, _$BookGroupPostDto];

  @override
  final String wireName = r'BookGroupPostDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    BookGroupPostDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'name';
    yield serializers.serialize(
      object.name,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    BookGroupPostDto object, {
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
    required BookGroupPostDtoBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'name':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.name = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  BookGroupPostDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = BookGroupPostDtoBuilder();
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
