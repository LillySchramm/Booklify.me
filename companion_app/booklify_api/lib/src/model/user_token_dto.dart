//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'user_token_dto.g.dart';

/// UserTokenDto
///
/// Properties:
/// * [accessToken]
@BuiltValue()
abstract class UserTokenDto
    implements Built<UserTokenDto, UserTokenDtoBuilder> {
  @BuiltValueField(wireName: r'accessToken')
  String get accessToken;

  UserTokenDto._();

  factory UserTokenDto([void updates(UserTokenDtoBuilder b)]) = _$UserTokenDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(UserTokenDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<UserTokenDto> get serializer => _$UserTokenDtoSerializer();
}

class _$UserTokenDtoSerializer implements PrimitiveSerializer<UserTokenDto> {
  @override
  final Iterable<Type> types = const [UserTokenDto, _$UserTokenDto];

  @override
  final String wireName = r'UserTokenDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    UserTokenDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'accessToken';
    yield serializers.serialize(
      object.accessToken,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    UserTokenDto object, {
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
    required UserTokenDtoBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'accessToken':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.accessToken = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  UserTokenDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = UserTokenDtoBuilder();
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
