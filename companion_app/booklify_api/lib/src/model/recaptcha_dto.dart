//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'recaptcha_dto.g.dart';

/// RecaptchaDto
///
/// Properties:
/// * [enabled]
/// * [siteKey]
@BuiltValue()
abstract class RecaptchaDto
    implements Built<RecaptchaDto, RecaptchaDtoBuilder> {
  @BuiltValueField(wireName: r'enabled')
  bool get enabled;

  @BuiltValueField(wireName: r'siteKey')
  String get siteKey;

  RecaptchaDto._();

  factory RecaptchaDto([void updates(RecaptchaDtoBuilder b)]) = _$RecaptchaDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(RecaptchaDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<RecaptchaDto> get serializer => _$RecaptchaDtoSerializer();
}

class _$RecaptchaDtoSerializer implements PrimitiveSerializer<RecaptchaDto> {
  @override
  final Iterable<Type> types = const [RecaptchaDto, _$RecaptchaDto];

  @override
  final String wireName = r'RecaptchaDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    RecaptchaDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'enabled';
    yield serializers.serialize(
      object.enabled,
      specifiedType: const FullType(bool),
    );
    yield r'siteKey';
    yield serializers.serialize(
      object.siteKey,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    RecaptchaDto object, {
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
    required RecaptchaDtoBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'enabled':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.enabled = valueDes;
          break;
        case r'siteKey':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.siteKey = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  RecaptchaDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = RecaptchaDtoBuilder();
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
