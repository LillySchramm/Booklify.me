//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'sign_in_dto.g.dart';

/// SignInDto
///
/// Properties:
/// * [email]
/// * [password]
/// * [permanent] - Whether to create a permanent session
@BuiltValue()
abstract class SignInDto implements Built<SignInDto, SignInDtoBuilder> {
  @BuiltValueField(wireName: r'email')
  String get email;

  @BuiltValueField(wireName: r'password')
  String get password;

  /// Whether to create a permanent session
  @BuiltValueField(wireName: r'permanent')
  bool get permanent;

  SignInDto._();

  factory SignInDto([void updates(SignInDtoBuilder b)]) = _$SignInDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(SignInDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<SignInDto> get serializer => _$SignInDtoSerializer();
}

class _$SignInDtoSerializer implements PrimitiveSerializer<SignInDto> {
  @override
  final Iterable<Type> types = const [SignInDto, _$SignInDto];

  @override
  final String wireName = r'SignInDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    SignInDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
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
    yield r'permanent';
    yield serializers.serialize(
      object.permanent,
      specifiedType: const FullType(bool),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    SignInDto object, {
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
    required SignInDtoBuilder result,
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
        case r'password':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.password = valueDes;
          break;
        case r'permanent':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.permanent = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  SignInDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = SignInDtoBuilder();
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
