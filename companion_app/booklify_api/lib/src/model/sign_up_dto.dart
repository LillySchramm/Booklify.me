//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'sign_up_dto.g.dart';

/// SignUpDto
///
/// Properties:
/// * [name]
/// * [email]
/// * [password]
/// * [recaptchaToken]
/// * [agreedTos]
/// * [agreedPrivacy]
@BuiltValue()
abstract class SignUpDto implements Built<SignUpDto, SignUpDtoBuilder> {
  @BuiltValueField(wireName: r'name')
  String get name;

  @BuiltValueField(wireName: r'email')
  String get email;

  @BuiltValueField(wireName: r'password')
  String get password;

  @BuiltValueField(wireName: r'recaptchaToken')
  String get recaptchaToken;

  @BuiltValueField(wireName: r'agreedTos')
  bool? get agreedTos;

  @BuiltValueField(wireName: r'agreedPrivacy')
  bool? get agreedPrivacy;

  SignUpDto._();

  factory SignUpDto([void updates(SignUpDtoBuilder b)]) = _$SignUpDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(SignUpDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<SignUpDto> get serializer => _$SignUpDtoSerializer();
}

class _$SignUpDtoSerializer implements PrimitiveSerializer<SignUpDto> {
  @override
  final Iterable<Type> types = const [SignUpDto, _$SignUpDto];

  @override
  final String wireName = r'SignUpDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    SignUpDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'name';
    yield serializers.serialize(
      object.name,
      specifiedType: const FullType(String),
    );
    yield r'email';
    yield serializers.serialize(
      object.email,
      specifiedType: const FullType(String),
    );
    yield r'password';
    yield serializers.serialize(
      object.password,
      specifiedType: const FullType(String),
    );
    yield r'recaptchaToken';
    yield serializers.serialize(
      object.recaptchaToken,
      specifiedType: const FullType(String),
    );
    yield r'agreedTos';
    yield object.agreedTos == null
        ? null
        : serializers.serialize(
            object.agreedTos,
            specifiedType: const FullType.nullable(bool),
          );
    yield r'agreedPrivacy';
    yield object.agreedPrivacy == null
        ? null
        : serializers.serialize(
            object.agreedPrivacy,
            specifiedType: const FullType.nullable(bool),
          );
  }

  @override
  Object serialize(
    Serializers serializers,
    SignUpDto object, {
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
    required SignUpDtoBuilder result,
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
        case r'email':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.email = valueDes;
          break;
        case r'password':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.password = valueDes;
          break;
        case r'recaptchaToken':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.recaptchaToken = valueDes;
          break;
        case r'agreedTos':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(bool),
          ) as bool?;
          if (valueDes == null) continue;
          result.agreedTos = valueDes;
          break;
        case r'agreedPrivacy':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(bool),
          ) as bool?;
          if (valueDes == null) continue;
          result.agreedPrivacy = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  SignUpDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = SignUpDtoBuilder();
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
