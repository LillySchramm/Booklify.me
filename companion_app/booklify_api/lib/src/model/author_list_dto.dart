//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:booklify_api/src/model/author_dto.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'author_list_dto.g.dart';

/// AuthorListDto
///
/// Properties:
/// * [authors]
@BuiltValue()
abstract class AuthorListDto
    implements Built<AuthorListDto, AuthorListDtoBuilder> {
  @BuiltValueField(wireName: r'authors')
  BuiltList<AuthorDto> get authors;

  AuthorListDto._();

  factory AuthorListDto([void updates(AuthorListDtoBuilder b)]) =
      _$AuthorListDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(AuthorListDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<AuthorListDto> get serializer =>
      _$AuthorListDtoSerializer();
}

class _$AuthorListDtoSerializer implements PrimitiveSerializer<AuthorListDto> {
  @override
  final Iterable<Type> types = const [AuthorListDto, _$AuthorListDto];

  @override
  final String wireName = r'AuthorListDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    AuthorListDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'authors';
    yield serializers.serialize(
      object.authors,
      specifiedType: const FullType(BuiltList, [FullType(AuthorDto)]),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    AuthorListDto object, {
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
    required AuthorListDtoBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'authors':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(AuthorDto)]),
          ) as BuiltList<AuthorDto>;
          result.authors.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  AuthorListDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = AuthorListDtoBuilder();
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
