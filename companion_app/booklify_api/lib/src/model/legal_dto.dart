//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'legal_dto.g.dart';

/// LegalDto
///
/// Properties:
/// * [enabled]
/// * [tosUrl]
/// * [privacyUrl]
@BuiltValue()
abstract class LegalDto implements Built<LegalDto, LegalDtoBuilder> {
  @BuiltValueField(wireName: r'enabled')
  bool get enabled;

  @BuiltValueField(wireName: r'tosUrl')
  String get tosUrl;

  @BuiltValueField(wireName: r'privacyUrl')
  String get privacyUrl;

  LegalDto._();

  factory LegalDto([void updates(LegalDtoBuilder b)]) = _$LegalDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(LegalDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<LegalDto> get serializer => _$LegalDtoSerializer();
}

class _$LegalDtoSerializer implements PrimitiveSerializer<LegalDto> {
  @override
  final Iterable<Type> types = const [LegalDto, _$LegalDto];

  @override
  final String wireName = r'LegalDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    LegalDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'enabled';
    yield serializers.serialize(
      object.enabled,
      specifiedType: const FullType(bool),
    );
    yield r'tosUrl';
    yield serializers.serialize(
      object.tosUrl,
      specifiedType: const FullType(String),
    );
    yield r'privacyUrl';
    yield serializers.serialize(
      object.privacyUrl,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    LegalDto object, {
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
    required LegalDtoBuilder result,
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
        case r'tosUrl':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.tosUrl = valueDes;
          break;
        case r'privacyUrl':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.privacyUrl = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  LegalDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = LegalDtoBuilder();
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
