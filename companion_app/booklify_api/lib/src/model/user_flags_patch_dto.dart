//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'user_flags_patch_dto.g.dart';

/// UserFlagsPatchDto
///
/// Properties:
/// * [public]
/// * [changelogNotificationEnabled]
@BuiltValue()
abstract class UserFlagsPatchDto
    implements Built<UserFlagsPatchDto, UserFlagsPatchDtoBuilder> {
  @BuiltValueField(wireName: r'public')
  bool? get public;

  @BuiltValueField(wireName: r'changelogNotificationEnabled')
  bool? get changelogNotificationEnabled;

  UserFlagsPatchDto._();

  factory UserFlagsPatchDto([void updates(UserFlagsPatchDtoBuilder b)]) =
      _$UserFlagsPatchDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(UserFlagsPatchDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<UserFlagsPatchDto> get serializer =>
      _$UserFlagsPatchDtoSerializer();
}

class _$UserFlagsPatchDtoSerializer
    implements PrimitiveSerializer<UserFlagsPatchDto> {
  @override
  final Iterable<Type> types = const [UserFlagsPatchDto, _$UserFlagsPatchDto];

  @override
  final String wireName = r'UserFlagsPatchDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    UserFlagsPatchDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    if (object.public != null) {
      yield r'public';
      yield serializers.serialize(
        object.public,
        specifiedType: const FullType(bool),
      );
    }
    if (object.changelogNotificationEnabled != null) {
      yield r'changelogNotificationEnabled';
      yield serializers.serialize(
        object.changelogNotificationEnabled,
        specifiedType: const FullType(bool),
      );
    }
  }

  @override
  Object serialize(
    Serializers serializers,
    UserFlagsPatchDto object, {
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
    required UserFlagsPatchDtoBuilder result,
    required List<Object?> unhandled,
  }) {
    for (var i = 0; i < serializedList.length; i += 2) {
      final key = serializedList[i] as String;
      final value = serializedList[i + 1];
      switch (key) {
        case r'public':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.public = valueDes;
          break;
        case r'changelogNotificationEnabled':
          final valueDes = serializers.deserialize(
            value,
            specifiedType: const FullType(bool),
          ) as bool;
          result.changelogNotificationEnabled = valueDes;
          break;
        default:
          unhandled.add(key);
          unhandled.add(value);
          break;
      }
    }
  }

  @override
  UserFlagsPatchDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = UserFlagsPatchDtoBuilder();
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
