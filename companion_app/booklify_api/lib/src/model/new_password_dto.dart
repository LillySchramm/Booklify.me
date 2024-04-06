//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'new_password_dto.g.dart';

/// NewPasswordDto
///
/// Properties:
/// * [resetId]
/// * [resetToken]
/// * [userId]
/// * [newPassword]
@BuiltValue()
abstract class NewPasswordDto
    implements Built<NewPasswordDto, NewPasswordDtoBuilder> {
  @BuiltValueField(wireName: r'resetId')
  String get resetId;

  @BuiltValueField(wireName: r'resetToken')
  String get resetToken;

  @BuiltValueField(wireName: r'userId')
  String get userId;

  @BuiltValueField(wireName: r'newPassword')
  String get newPassword;

  NewPasswordDto._();

  factory NewPasswordDto([void updates(NewPasswordDtoBuilder b)]) =
      _$NewPasswordDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(NewPasswordDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<NewPasswordDto> get serializer =>
      _$NewPasswordDtoSerializer();
}

class _$NewPasswordDtoSerializer
    implements PrimitiveSerializer<NewPasswordDto> {
  @override
  final Iterable<Type> types = const [NewPasswordDto, _$NewPasswordDto];

  @override
  final String wireName = r'NewPasswordDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    NewPasswordDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'resetId';
    yield serializers.serialize(
      object.resetId,
      specifiedType: const FullType(String),
    );
    yield r'resetToken';
    yield serializers.serialize(
      object.resetToken,
      specifiedType: const FullType(String),
    );
    yield r'userId';
    yield serializers.serialize(
      object.userId,
      specifiedType: const FullType(String),
    );
    yield r'newPassword';
    yield serializers.serialize(
      object.newPassword,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    NewPasswordDto object, {
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
    required NewPasswordDtoBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'resetId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.resetId = valueDes;
          break;
        case r'resetToken':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.resetToken = valueDes;
          break;
        case r'userId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.userId = valueDes;
          break;
        case r'newPassword':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.newPassword = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  NewPasswordDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = NewPasswordDtoBuilder();
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
