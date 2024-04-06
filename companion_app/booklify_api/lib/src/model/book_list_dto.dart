//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:booklify_api/src/model/book_dto.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'book_list_dto.g.dart';

/// BookListDto
///
/// Properties:
/// * [books]
@BuiltValue()
abstract class BookListDto implements Built<BookListDto, BookListDtoBuilder> {
  @BuiltValueField(wireName: r'books')
  BuiltList<BookDto> get books;

  BookListDto._();

  factory BookListDto([void updates(BookListDtoBuilder b)]) = _$BookListDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(BookListDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<BookListDto> get serializer => _$BookListDtoSerializer();
}

class _$BookListDtoSerializer implements PrimitiveSerializer<BookListDto> {
  @override
  final Iterable<Type> types = const [BookListDto, _$BookListDto];

  @override
  final String wireName = r'BookListDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    BookListDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'books';
    yield serializers.serialize(
      object.books,
      specifiedType: const FullType(BuiltList, [FullType(BookDto)]),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    BookListDto object, {
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
    required BookListDtoBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'books':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(BookDto)]),
          ) as BuiltList<BookDto>;
          result.books.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  BookListDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = BookListDtoBuilder();
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
