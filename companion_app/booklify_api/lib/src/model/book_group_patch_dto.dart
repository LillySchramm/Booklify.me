//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'book_group_patch_dto.g.dart';

/// BookGroupPatchDto
///
/// Properties:
/// * [name]
@BuiltValue()
abstract class BookGroupPatchDto
    implements Built<BookGroupPatchDto, BookGroupPatchDtoBuilder> {
  @BuiltValueField(wireName: r'name')
  String get name;

  BookGroupPatchDto._();

  factory BookGroupPatchDto([void updates(BookGroupPatchDtoBuilder b)]) =
      _$BookGroupPatchDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(BookGroupPatchDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<BookGroupPatchDto> get serializer =>
      _$BookGroupPatchDtoSerializer();
}

class _$BookGroupPatchDtoSerializer
    implements PrimitiveSerializer<BookGroupPatchDto> {
  @override
  final Iterable<Type> types = const [BookGroupPatchDto, _$BookGroupPatchDto];

  @override
  final String wireName = r'BookGroupPatchDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    BookGroupPatchDto object, {
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
    BookGroupPatchDto object, {
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
    required BookGroupPatchDtoBuilder result,
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
  BookGroupPatchDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = BookGroupPatchDtoBuilder();
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
