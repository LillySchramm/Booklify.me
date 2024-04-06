//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'reports_dto.g.dart';

/// ReportsDto
///
/// Properties:
/// * [enabled]
@BuiltValue()
abstract class ReportsDto implements Built<ReportsDto, ReportsDtoBuilder> {
  @BuiltValueField(wireName: r'enabled')
  bool get enabled;

  ReportsDto._();

  factory ReportsDto([void updates(ReportsDtoBuilder b)]) = _$ReportsDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(ReportsDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<ReportsDto> get serializer => _$ReportsDtoSerializer();
}

class _$ReportsDtoSerializer implements PrimitiveSerializer<ReportsDto> {
  @override
  final Iterable<Type> types = const [ReportsDto, _$ReportsDto];

  @override
  final String wireName = r'ReportsDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    ReportsDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'enabled';
    yield serializers.serialize(
      object.enabled,
      specifiedType: const FullType(bool),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    ReportsDto object, {
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
    required ReportsDtoBuilder result,
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
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  ReportsDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = ReportsDtoBuilder();
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
