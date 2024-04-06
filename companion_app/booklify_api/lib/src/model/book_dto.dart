//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:booklify_api/src/model/identifier_dto.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'book_dto.g.dart';

/// BookDto
///
/// Properties:
/// * [isbn]
/// * [title]
/// * [subtitle]
/// * [publishedDate]
/// * [description]
/// * [pageCount]
/// * [printedPageCount]
/// * [language]
/// * [createdAt]
/// * [updatedAt]
/// * [publisherId]
/// * [bookCoverId]
/// * [amazonLink]
/// * [authors]
/// * [groupId]
/// * [hidden]
/// * [noGroup]
/// * [favorite]
@BuiltValue()
abstract class BookDto implements Built<BookDto, BookDtoBuilder> {
  @BuiltValueField(wireName: r'isbn')
  String get isbn;

  @BuiltValueField(wireName: r'title')
  String? get title;

  @BuiltValueField(wireName: r'subtitle')
  String? get subtitle;

  @BuiltValueField(wireName: r'publishedDate')
  String? get publishedDate;

  @BuiltValueField(wireName: r'description')
  String? get description;

  @BuiltValueField(wireName: r'pageCount')
  num? get pageCount;

  @BuiltValueField(wireName: r'printedPageCount')
  num? get printedPageCount;

  @BuiltValueField(wireName: r'language')
  String? get language;

  @BuiltValueField(wireName: r'createdAt')
  DateTime get createdAt;

  @BuiltValueField(wireName: r'updatedAt')
  DateTime get updatedAt;

  @BuiltValueField(wireName: r'publisherId')
  String? get publisherId;

  @BuiltValueField(wireName: r'bookCoverId')
  String? get bookCoverId;

  @BuiltValueField(wireName: r'amazonLink')
  String? get amazonLink;

  @BuiltValueField(wireName: r'authors')
  BuiltList<IdentifierDto> get authors;

  @BuiltValueField(wireName: r'groupId')
  String? get groupId;

  @BuiltValueField(wireName: r'hidden')
  bool get hidden;

  @BuiltValueField(wireName: r'noGroup')
  bool get noGroup;

  @BuiltValueField(wireName: r'favorite')
  bool get favorite;

  BookDto._();

  factory BookDto([void updates(BookDtoBuilder b)]) = _$BookDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(BookDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<BookDto> get serializer => _$BookDtoSerializer();
}

class _$BookDtoSerializer implements PrimitiveSerializer<BookDto> {
  @override
  final Iterable<Type> types = const [BookDto, _$BookDto];

  @override
  final String wireName = r'BookDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    BookDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'isbn';
    yield serializers.serialize(
      object.isbn,
      specifiedType: const FullType(String),
    );
    yield r'title';
    yield object.title == null
        ? null
        : serializers.serialize(
            object.title,
            specifiedType: const FullType.nullable(String),
          );
    yield r'subtitle';
    yield object.subtitle == null
        ? null
        : serializers.serialize(
            object.subtitle,
            specifiedType: const FullType.nullable(String),
          );
    yield r'publishedDate';
    yield object.publishedDate == null
        ? null
        : serializers.serialize(
            object.publishedDate,
            specifiedType: const FullType.nullable(String),
          );
    yield r'description';
    yield object.description == null
        ? null
        : serializers.serialize(
            object.description,
            specifiedType: const FullType.nullable(String),
          );
    yield r'pageCount';
    yield object.pageCount == null
        ? null
        : serializers.serialize(
            object.pageCount,
            specifiedType: const FullType.nullable(num),
          );
    yield r'printedPageCount';
    yield object.printedPageCount == null
        ? null
        : serializers.serialize(
            object.printedPageCount,
            specifiedType: const FullType.nullable(num),
          );
    yield r'language';
    yield object.language == null
        ? null
        : serializers.serialize(
            object.language,
            specifiedType: const FullType.nullable(String),
          );
    yield r'createdAt';
    yield serializers.serialize(
      object.createdAt,
      specifiedType: const FullType(DateTime),
    );
    yield r'updatedAt';
    yield serializers.serialize(
      object.updatedAt,
      specifiedType: const FullType(DateTime),
    );
    yield r'publisherId';
    yield object.publisherId == null
        ? null
        : serializers.serialize(
            object.publisherId,
            specifiedType: const FullType.nullable(String),
          );
    yield r'bookCoverId';
    yield object.bookCoverId == null
        ? null
        : serializers.serialize(
            object.bookCoverId,
            specifiedType: const FullType.nullable(String),
          );
    yield r'amazonLink';
    yield object.amazonLink == null
        ? null
        : serializers.serialize(
            object.amazonLink,
            specifiedType: const FullType.nullable(String),
          );
    yield r'authors';
    yield serializers.serialize(
      object.authors,
      specifiedType: const FullType(BuiltList, [FullType(IdentifierDto)]),
    );
    yield r'groupId';
    yield object.groupId == null
        ? null
        : serializers.serialize(
            object.groupId,
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
    BookDto object, {
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
    required BookDtoBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'isbn':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.isbn = valueDes;
          break;
        case r'title':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(String),
          ) as String?;
          if (valueDes == null) continue;
          result.title = valueDes;
          break;
        case r'subtitle':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(String),
          ) as String?;
          if (valueDes == null) continue;
          result.subtitle = valueDes;
          break;
        case r'publishedDate':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(String),
          ) as String?;
          if (valueDes == null) continue;
          result.publishedDate = valueDes;
          break;
        case r'description':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(String),
          ) as String?;
          if (valueDes == null) continue;
          result.description = valueDes;
          break;
        case r'pageCount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(num),
          ) as num?;
          if (valueDes == null) continue;
          result.pageCount = valueDes;
          break;
        case r'printedPageCount':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(num),
          ) as num?;
          if (valueDes == null) continue;
          result.printedPageCount = valueDes;
          break;
        case r'language':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(String),
          ) as String?;
          if (valueDes == null) continue;
          result.language = valueDes;
          break;
        case r'createdAt':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.createdAt = valueDes;
          break;
        case r'updatedAt':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(DateTime),
          ) as DateTime;
          result.updatedAt = valueDes;
          break;
        case r'publisherId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(String),
          ) as String?;
          if (valueDes == null) continue;
          result.publisherId = valueDes;
          break;
        case r'bookCoverId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(String),
          ) as String?;
          if (valueDes == null) continue;
          result.bookCoverId = valueDes;
          break;
        case r'amazonLink':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(String),
          ) as String?;
          if (valueDes == null) continue;
          result.amazonLink = valueDes;
          break;
        case r'authors':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(IdentifierDto)]),
          ) as BuiltList<IdentifierDto>;
          result.authors.replace(valueDes);
          break;
        case r'groupId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(String),
          ) as String?;
          if (valueDes == null) continue;
          result.groupId = valueDes;
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
  BookDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = BookDtoBuilder();
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
