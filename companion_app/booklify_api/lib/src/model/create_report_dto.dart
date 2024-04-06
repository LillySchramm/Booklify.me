//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'create_report_dto.g.dart';

/// CreateReportDto
///
/// Properties:
/// * [category]
/// * [alternateCategory]
/// * [message]
/// * [targetId]
@BuiltValue()
abstract class CreateReportDto
    implements Built<CreateReportDto, CreateReportDtoBuilder> {
  @BuiltValueField(wireName: r'category')
  String get category;

  @BuiltValueField(wireName: r'alternateCategory')
  String? get alternateCategory;

  @BuiltValueField(wireName: r'message')
  String get message;

  @BuiltValueField(wireName: r'targetId')
  String get targetId;

  CreateReportDto._();

  factory CreateReportDto([void updates(CreateReportDtoBuilder b)]) =
      _$CreateReportDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(CreateReportDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<CreateReportDto> get serializer =>
      _$CreateReportDtoSerializer();
}

class _$CreateReportDtoSerializer
    implements PrimitiveSerializer<CreateReportDto> {
  @override
  final Iterable<Type> types = const [CreateReportDto, _$CreateReportDto];

  @override
  final String wireName = r'CreateReportDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    CreateReportDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'category';
    yield serializers.serialize(
      object.category,
      specifiedType: const FullType(String),
    );
    yield r'alternateCategory';
    yield object.alternateCategory == null
        ? null
        : serializers.serialize(
            object.alternateCategory,
            specifiedType: const FullType.nullable(String),
          );
    yield r'message';
    yield serializers.serialize(
      object.message,
      specifiedType: const FullType(String),
    );
    yield r'targetId';
    yield serializers.serialize(
      object.targetId,
      specifiedType: const FullType(String),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    CreateReportDto object, {
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
    required CreateReportDtoBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'category':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.category = valueDes;
          break;
        case r'alternateCategory':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType.nullable(String),
          ) as String?;
          if (valueDes == null) continue;
          result.alternateCategory = valueDes;
          break;
        case r'message':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.message = valueDes;
          break;
        case r'targetId':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(String),
          ) as String;
          result.targetId = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  CreateReportDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = CreateReportDtoBuilder();
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
