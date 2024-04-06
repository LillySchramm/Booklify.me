//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'reset_password_request_dto.g.dart';

/// ResetPasswordRequestDto
///
/// Properties:
/// * [email]
@BuiltValue()
abstract class ResetPasswordRequestDto
    implements Built<ResetPasswordRequestDto, ResetPasswordRequestDtoBuilder> {
  @BuiltValueField(wireName: r'email')
  String get email;

  ResetPasswordRequestDto._();

  factory ResetPasswordRequestDto(
          [void updates(ResetPasswordRequestDtoBuilder b)]) =
      _$ResetPasswordRequestDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(ResetPasswordRequestDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<ResetPasswordRequestDto> get serializer =>
      _$ResetPasswordRequestDtoSerializer();
}

class _$ResetPasswordRequestDtoSerializer
    implements PrimitiveSerializer<ResetPasswordRequestDto> {
  @override
  final Iterable<Type> types = const [
    ResetPasswordRequestDto,
    _$ResetPasswordRequestDto
  ];

  @override
  final String wireName = r'ResetPasswordRequestDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    ResetPasswordRequestDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'email';
    yield serializers.serialize(
      object.email,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    ResetPasswordRequestDto object, {
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
    required ResetPasswordRequestDtoBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'email':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.email = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  ResetPasswordRequestDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = ResetPasswordRequestDtoBuilder();
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
