//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'sign_in_success_dto.g.dart';

/// SignInSuccessDto
///
/// Properties:
/// * [accessToken]
@BuiltValue()
abstract class SignInSuccessDto
    implements Built<SignInSuccessDto, SignInSuccessDtoBuilder> {
  @BuiltValueField(wireName: r'accessToken')
  String get accessToken;

  SignInSuccessDto._();

  factory SignInSuccessDto([void updates(SignInSuccessDtoBuilder b)]) =
      _$SignInSuccessDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(SignInSuccessDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<SignInSuccessDto> get serializer =>
      _$SignInSuccessDtoSerializer();
}

class _$SignInSuccessDtoSerializer
    implements PrimitiveSerializer<SignInSuccessDto> {
  @override
  final Iterable<Type> types = const [SignInSuccessDto, _$SignInSuccessDto];

  @override
  final String wireName = r'SignInSuccessDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    SignInSuccessDto object, {
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
    SignInSuccessDto object, {
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
    required SignInSuccessDtoBuilder result,
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
  SignInSuccessDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = SignInSuccessDtoBuilder();
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
