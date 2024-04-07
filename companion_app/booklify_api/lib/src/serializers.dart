//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//

// ignore_for_file: unused_import

import 'package:one_of_serializer/any_of_serializer.dart';
import 'package:one_of_serializer/one_of_serializer.dart';
import 'package:built_collection/built_collection.dart';
import 'package:built_value/json_object.dart';
import 'package:built_value/serializer.dart';
import 'package:built_value/standard_json_plugin.dart';
import 'package:built_value/iso_8601_date_time_serializer.dart';
import 'package:booklify_api/src/date_serializer.dart';
import 'package:booklify_api/src/model/date.dart';

import 'package:booklify_api/src/model/amazon_dto.dart';
import 'package:booklify_api/src/model/author_dto.dart';
import 'package:booklify_api/src/model/author_list_dto.dart';
import 'package:booklify_api/src/model/basic_user_dto.dart';
import 'package:booklify_api/src/model/book_dto.dart';
import 'package:booklify_api/src/model/book_group_dto.dart';
import 'package:booklify_api/src/model/book_group_list_dto.dart';
import 'package:booklify_api/src/model/book_list_dto.dart';
import 'package:booklify_api/src/model/change_password_dto.dart';
import 'package:booklify_api/src/model/create_report_dto.dart';
import 'package:booklify_api/src/model/get_id_list_dto.dart';
import 'package:booklify_api/src/model/identifier_dto.dart';
import 'package:booklify_api/src/model/legal_dto.dart';
import 'package:booklify_api/src/model/new_password_dto.dart';
import 'package:booklify_api/src/model/ownership_status_dto.dart';
import 'package:booklify_api/src/model/publisher_dto.dart';
import 'package:booklify_api/src/model/publisher_list_dto.dart';
import 'package:booklify_api/src/model/recaptcha_dto.dart';
import 'package:booklify_api/src/model/reports_dto.dart';
import 'package:booklify_api/src/model/reset_password_dto.dart';
import 'package:booklify_api/src/model/reset_password_request_dto.dart';
import 'package:booklify_api/src/model/session_dto.dart';
import 'package:booklify_api/src/model/session_list_dto.dart';
import 'package:booklify_api/src/model/set_ownership_flags_dto.dart';
import 'package:booklify_api/src/model/set_ownership_status_dto.dart';
import 'package:booklify_api/src/model/sign_in_dto.dart';
import 'package:booklify_api/src/model/sign_in_success_dto.dart';
import 'package:booklify_api/src/model/sign_up_dto.dart';
import 'package:booklify_api/src/model/system_health_dto.dart';
import 'package:booklify_api/src/model/system_info_dto.dart';
import 'package:booklify_api/src/model/user_dto.dart';
import 'package:booklify_api/src/model/user_flags_dto.dart';
import 'package:booklify_api/src/model/user_flags_patch_dto.dart';
import 'package:booklify_api/src/model/user_token_dto.dart';

part 'serializers.g.dart';

@SerializersFor([
  AmazonDto,
  AuthorDto,
  AuthorListDto,
  BasicUserDto,
  BookDto,
  BookGroupDto,
  BookGroupListDto,
  BookListDto,
  ChangePasswordDto,
  CreateReportDto,
  GetIdListDto,
  IdentifierDto,
  LegalDto,
  NewPasswordDto,
  OwnershipStatusDto,
  PublisherDto,
  PublisherListDto,
  RecaptchaDto,
  ReportsDto,
  ResetPasswordDto,
  ResetPasswordRequestDto,
  SessionDto,
  SessionListDto,
  SetOwnershipFlagsDto,
  SetOwnershipStatusDto,
  SignInDto,
  SignInSuccessDto,
  SignUpDto,
  SystemHealthDto,
  SystemInfoDto,
  UserDto,
  UserFlagsDto,
  UserFlagsPatchDto,
  UserTokenDto,
])
Serializers serializers = (_$serializers.toBuilder()
      ..add(const OneOfSerializer())
      ..add(const AnyOfSerializer())
      ..add(const DateSerializer())
      ..add(Iso8601DateTimeSerializer()))
    .build();

Serializers standardSerializers =
    (serializers.toBuilder()..addPlugin(StandardJsonPlugin())).build();
