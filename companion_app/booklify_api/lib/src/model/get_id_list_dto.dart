//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'get_id_list_dto.g.dart';

/// GetIdListDto
///
/// Properties:
/// * [ids]
@BuiltValue()
abstract class GetIdListDto
    implements Built<GetIdListDto, GetIdListDtoBuilder> {
  @BuiltValueField(wireName: r'ids')
  BuiltList<String> get ids;

  GetIdListDto._();

  factory GetIdListDto([void updates(GetIdListDtoBuilder b)]) = _$GetIdListDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(GetIdListDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<GetIdListDto> get serializer => _$GetIdListDtoSerializer();
}

class _$GetIdListDtoSerializer implements PrimitiveSerializer<GetIdListDto> {
  @override
  final Iterable<Type> types = const [GetIdListDto, _$GetIdListDto];

  @override
  final String wireName = r'GetIdListDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    GetIdListDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'ids';
    yield serializers.serialize(
      object.ids,
      specifiedType: const FullType(BuiltList, [FullType(String)]),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    GetIdListDto object, {
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
    required GetIdListDtoBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'ids':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(String)]),
          ) as BuiltList<String>;
          result.ids.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  GetIdListDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = GetIdListDtoBuilder();
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
