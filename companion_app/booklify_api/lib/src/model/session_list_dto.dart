//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_collection/built_collection.dart';
import 'package:booklify_api/src/model/session_dto.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'session_list_dto.g.dart';

/// SessionListDto
///
/// Properties:
/// * [sessions]
@BuiltValue()
abstract class SessionListDto
    implements Built<SessionListDto, SessionListDtoBuilder> {
  @BuiltValueField(wireName: r'sessions')
  BuiltList<SessionDto> get sessions;

  SessionListDto._();

  factory SessionListDto([void updates(SessionListDtoBuilder b)]) =
      _$SessionListDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(SessionListDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<SessionListDto> get serializer =>
      _$SessionListDtoSerializer();
}

class _$SessionListDtoSerializer
    implements PrimitiveSerializer<SessionListDto> {
  @override
  final Iterable<Type> types = const [SessionListDto, _$SessionListDto];

  @override
  final String wireName = r'SessionListDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    SessionListDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'sessions';
    yield serializers.serialize(
      object.sessions,
      specifiedType: const FullType(BuiltList, [FullType(SessionDto)]),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    SessionListDto object, {
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
    required SessionListDtoBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'sessions':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(BuiltList, [FullType(SessionDto)]),
          ) as BuiltList<SessionDto>;
          result.sessions.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  SessionListDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = SessionListDtoBuilder();
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
