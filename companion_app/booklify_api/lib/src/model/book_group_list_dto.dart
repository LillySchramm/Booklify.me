//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:booklify_api/src/model/book_group_dto.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'book_group_list_dto.g.dart';

/// BookGroupListDto
///
/// Properties:
/// * [groups]
@BuiltValue()
abstract class BookGroupListDto
    implements Built<BookGroupListDto, BookGroupListDtoBuilder> {
  @BuiltValueField(wireName: r'groups')
  BuiltList<BookGroupDto> get groups;

  BookGroupListDto._();

  factory BookGroupListDto([void updates(BookGroupListDtoBuilder b)]) =
      _$BookGroupListDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(BookGroupListDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<BookGroupListDto> get serializer =>
      _$BookGroupListDtoSerializer();
}

class _$BookGroupListDtoSerializer
    implements PrimitiveSerializer<BookGroupListDto> {
  @override
  final Iterable<Type> types = const [BookGroupListDto, _$BookGroupListDto];

  @override
  final String wireName = r'BookGroupListDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    BookGroupListDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'groups';
    yield serializers.serialize(
      object.groups,
      specifiedType: const FullType(BuiltList, [FullType(BookGroupDto)]),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    BookGroupListDto object, {
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
    required BookGroupListDtoBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'groups':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(BookGroupDto)]),
          ) as BuiltList<BookGroupDto>;
          result.groups.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  BookGroupListDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = BookGroupListDtoBuilder();
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
