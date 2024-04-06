//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_element
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

part 'user_flags_dto.g.dart';

/// UserFlagsDto
///
/// Properties:
/// * [public]
/// * [changelogNotificationEnabled]
@BuiltValue()
abstract class UserFlagsDto
    implements Built<UserFlagsDto, UserFlagsDtoBuilder> {
  @BuiltValueField(wireName: r'public')
  bool get public;

  @BuiltValueField(wireName: r'changelogNotificationEnabled')
  bool get changelogNotificationEnabled;

  UserFlagsDto._();

  factory UserFlagsDto([void updates(UserFlagsDtoBuilder b)]) = _$UserFlagsDto;

  @BuiltValueHook(initializeBuilder: true)
  static void _defaults(UserFlagsDtoBuilder b) => b;

  @BuiltValueSerializer(custom: true)
  static Serializer<UserFlagsDto> get serializer => _$UserFlagsDtoSerializer();
}

class _$UserFlagsDtoSerializer implements PrimitiveSerializer<UserFlagsDto> {
  @override
  final Iterable<Type> types = const [UserFlagsDto, _$UserFlagsDto];

  @override
  final String wireName = r'UserFlagsDto';

  Iterable<Object?> _serializeProperties(
    Serializers serializers,
    UserFlagsDto object, {
    FullType specifiedType = FullType.unspecified,
  }) sync* {
    yield r'public';
    yield serializers.serialize(
      object.public,
      specifiedType: const FullType(bool),
    );
    yield r'changelogNotificationEnabled';
    yield serializers.serialize(
      object.changelogNotificationEnabled,
      specifiedType: const FullType(bool),
    );
  }

  @override
  Object serialize(
    Serializers serializers,
    UserFlagsDto object, {
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
    required UserFlagsDtoBuilder result,
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
  UserFlagsDto deserialize(
    Serializers serializers,
    Object serialized, {
    FullType specifiedType = FullType.unspecified,
  }) {
    final result = UserFlagsDtoBuilder();
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
