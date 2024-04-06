//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:booklify_api/src/model/reports_dto.dart';
import 'package:booklify_api/src/model/amazon_dto.dart';
import 'package:booklify_api/src/model/legal_dto.dart';
import 'package:booklify_api/src/model/recaptcha_dto.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'system_info_dto.g.dart';

/// SystemInfoDto
///
/// Properties:
/// * [signUpEnabled]
/// * [cdn]
/// * [recaptcha]
/// * [legal]
/// * [reports]
/// * [version]
/// * [amazon]
@BuiltValue()
abstract class SystemInfoDto
    implements Built<SystemInfoDto, SystemInfoDtoBuilder> {
  @BuiltValueField(wireName: r'signUpEnabled')
  bool get signUpEnabled;

  @BuiltValueField(wireName: r'cdn')
  String get cdn;

  @BuiltValueField(wireName: r'recaptcha')
  RecaptchaDto get recaptcha;

  @BuiltValueField(wireName: r'legal')
  LegalDto get legal;

  @BuiltValueField(wireName: r'reports')
  ReportsDto get reports;

  @BuiltValueField(wireName: r'version')
  String get version;

  @BuiltValueField(wireName: r'amazon')
  AmazonDto get amazon;

  SystemInfoDto._();

  factory SystemInfoDto([void updates(SystemInfoDtoBuilder b)]) =
      _$SystemInfoDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(SystemInfoDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<SystemInfoDto> get serializer =>
      _$SystemInfoDtoSerializer();
}

class _$SystemInfoDtoSerializer implements PrimitiveSerializer<SystemInfoDto> {
  @override
  final Iterable<Type> types = const [SystemInfoDto, _$SystemInfoDto];

  @override
  final String wireName = r'SystemInfoDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    SystemInfoDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'signUpEnabled';
    yield serializers.serialize(
      object.signUpEnabled,
      specifiedType: const FullType(bool),
    );
    yield r'cdn';
    yield serializers.serialize(
      object.cdn,
      specifiedType: const FullType(String),
    );
    yield r'recaptcha';
    yield serializers.serialize(
      object.recaptcha,
      specifiedType: const FullType(RecaptchaDto),
    );
    yield r'legal';
    yield serializers.serialize(
      object.legal,
      specifiedType: const FullType(LegalDto),
    );
    yield r'reports';
    yield serializers.serialize(
      object.reports,
      specifiedType: const FullType(ReportsDto),
    );
    yield r'version';
    yield serializers.serialize(
      object.version,
      specifiedType: const FullType(String),
    );
    yield r'amazon';
    yield serializers.serialize(
      object.amazon,
      specifiedType: const FullType(AmazonDto),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    SystemInfoDto object, {
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
    required SystemInfoDtoBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'signUpEnabled':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.signUpEnabled = valueDes;
          break;
        case r'cdn':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.cdn = valueDes;
          break;
        case r'recaptcha':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(RecaptchaDto),
          ) as RecaptchaDto;
          result.recaptcha.replace(valueDes);
          break;
        case r'legal':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(LegalDto),
          ) as LegalDto;
          result.legal.replace(valueDes);
          break;
        case r'reports':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(ReportsDto),
          ) as ReportsDto;
          result.reports.replace(valueDes);
          break;
        case r'version':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.version = valueDes;
          break;
        case r'amazon':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(AmazonDto),
          ) as AmazonDto;
          result.amazon.replace(valueDes);
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  SystemInfoDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = SystemInfoDtoBuilder();
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
