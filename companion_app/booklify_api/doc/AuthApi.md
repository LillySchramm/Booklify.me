# booklify_api.api.AuthApi

## Load the API package
```dart
import 'package:booklify_api/api.dart';
```

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authControllerChangePassword**](AuthApi.md#authcontrollerchangepassword) | **POST** /auth/password | 
[**authControllerDeleteProfile**](AuthApi.md#authcontrollerdeleteprofile) | **DELETE** /auth/profile | 
[**authControllerGetExport**](AuthApi.md#authcontrollergetexport) | **GET** /auth/export | 
[**authControllerGetNewToken**](AuthApi.md#authcontrollergetnewtoken) | **GET** /auth/token | 
[**authControllerGetProfile**](AuthApi.md#authcontrollergetprofile) | **GET** /auth/profile | 
[**authControllerGetSession**](AuthApi.md#authcontrollergetsession) | **GET** /auth/session | 
[**authControllerGetSessions**](AuthApi.md#authcontrollergetsessions) | **GET** /auth/sessions | 
[**authControllerInvalidateSession**](AuthApi.md#authcontrollerinvalidatesession) | **DELETE** /auth/session/{id} | 
[**authControllerRefreshToken**](AuthApi.md#authcontrollerrefreshtoken) | **GET** /auth/refresh | 
[**authControllerRequestResetPassword**](AuthApi.md#authcontrollerrequestresetpassword) | **POST** /auth/request-reset | 
[**authControllerResend**](AuthApi.md#authcontrollerresend) | **POST** /auth/resend | 
[**authControllerResetPassword**](AuthApi.md#authcontrollerresetpassword) | **POST** /auth/reset | 
[**authControllerSignIn**](AuthApi.md#authcontrollersignin) | **POST** /auth/login | 
[**authControllerSignOut**](AuthApi.md#authcontrollersignout) | **POST** /auth/logout | 
[**authControllerSignUp**](AuthApi.md#authcontrollersignup) | **POST** /auth/signup | 
[**authControllerVerify**](AuthApi.md#authcontrollerverify) | **GET** /auth/verify | 


# **authControllerChangePassword**
> authControllerChangePassword(changePasswordDto)



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getAuthApi();
final ChangePasswordDto changePasswordDto = ; // ChangePasswordDto | 

try {
    api.authControllerChangePassword(changePasswordDto);
} catch on DioException (e) {
    print('Exception when calling AuthApi->authControllerChangePassword: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **changePasswordDto** | [**ChangePasswordDto**](ChangePasswordDto.md)|  | 

### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerDeleteProfile**
> authControllerDeleteProfile()



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getAuthApi();

try {
    api.authControllerDeleteProfile();
} catch on DioException (e) {
    print('Exception when calling AuthApi->authControllerDeleteProfile: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerGetExport**
> authControllerGetExport()



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getAuthApi();

try {
    api.authControllerGetExport();
} catch on DioException (e) {
    print('Exception when calling AuthApi->authControllerGetExport: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerGetNewToken**
> UserTokenDto authControllerGetNewToken()



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getAuthApi();

try {
    final response = api.authControllerGetNewToken();
    print(response);
} catch on DioException (e) {
    print('Exception when calling AuthApi->authControllerGetNewToken: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**UserTokenDto**](UserTokenDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerGetProfile**
> UserDto authControllerGetProfile()



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getAuthApi();

try {
    final response = api.authControllerGetProfile();
    print(response);
} catch on DioException (e) {
    print('Exception when calling AuthApi->authControllerGetProfile: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**UserDto**](UserDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerGetSession**
> SessionDto authControllerGetSession()



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getAuthApi();

try {
    final response = api.authControllerGetSession();
    print(response);
} catch on DioException (e) {
    print('Exception when calling AuthApi->authControllerGetSession: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**SessionDto**](SessionDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerGetSessions**
> SessionListDto authControllerGetSessions()



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getAuthApi();

try {
    final response = api.authControllerGetSessions();
    print(response);
} catch on DioException (e) {
    print('Exception when calling AuthApi->authControllerGetSessions: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**SessionListDto**](SessionListDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerInvalidateSession**
> SessionDto authControllerInvalidateSession(id)



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getAuthApi();
final String id = id_example; // String | 

try {
    final response = api.authControllerInvalidateSession(id);
    print(response);
} catch on DioException (e) {
    print('Exception when calling AuthApi->authControllerInvalidateSession: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 

### Return type

[**SessionDto**](SessionDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerRefreshToken**
> UserTokenDto authControllerRefreshToken(token, sessionId)



### Example
```dart
import 'package:booklify_api/api.dart';

final api = BooklifyApi().getAuthApi();
final String token = token_example; // String | 
final String sessionId = sessionId_example; // String | 

try {
    final response = api.authControllerRefreshToken(token, sessionId);
    print(response);
} catch on DioException (e) {
    print('Exception when calling AuthApi->authControllerRefreshToken: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **token** | **String**|  | 
 **sessionId** | **String**|  | 

### Return type

[**UserTokenDto**](UserTokenDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerRequestResetPassword**
> ResetPasswordDto authControllerRequestResetPassword(resetPasswordRequestDto)



### Example
```dart
import 'package:booklify_api/api.dart';

final api = BooklifyApi().getAuthApi();
final ResetPasswordRequestDto resetPasswordRequestDto = ; // ResetPasswordRequestDto | 

try {
    final response = api.authControllerRequestResetPassword(resetPasswordRequestDto);
    print(response);
} catch on DioException (e) {
    print('Exception when calling AuthApi->authControllerRequestResetPassword: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **resetPasswordRequestDto** | [**ResetPasswordRequestDto**](ResetPasswordRequestDto.md)|  | 

### Return type

[**ResetPasswordDto**](ResetPasswordDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerResend**
> authControllerResend(userId)



### Example
```dart
import 'package:booklify_api/api.dart';

final api = BooklifyApi().getAuthApi();
final String userId = userId_example; // String | 

try {
    api.authControllerResend(userId);
} catch on DioException (e) {
    print('Exception when calling AuthApi->authControllerResend: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**|  | 

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerResetPassword**
> authControllerResetPassword(newPasswordDto)



### Example
```dart
import 'package:booklify_api/api.dart';

final api = BooklifyApi().getAuthApi();
final NewPasswordDto newPasswordDto = ; // NewPasswordDto | 

try {
    api.authControllerResetPassword(newPasswordDto);
} catch on DioException (e) {
    print('Exception when calling AuthApi->authControllerResetPassword: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **newPasswordDto** | [**NewPasswordDto**](NewPasswordDto.md)|  | 

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerSignIn**
> SignInSuccessDto authControllerSignIn(signInDto)



### Example
```dart
import 'package:booklify_api/api.dart';

final api = BooklifyApi().getAuthApi();
final SignInDto signInDto = ; // SignInDto | 

try {
    final response = api.authControllerSignIn(signInDto);
    print(response);
} catch on DioException (e) {
    print('Exception when calling AuthApi->authControllerSignIn: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **signInDto** | [**SignInDto**](SignInDto.md)|  | 

### Return type

[**SignInSuccessDto**](SignInSuccessDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerSignOut**
> authControllerSignOut()



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getAuthApi();

try {
    api.authControllerSignOut();
} catch on DioException (e) {
    print('Exception when calling AuthApi->authControllerSignOut: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerSignUp**
> UserDto authControllerSignUp(signUpDto)



### Example
```dart
import 'package:booklify_api/api.dart';

final api = BooklifyApi().getAuthApi();
final SignUpDto signUpDto = ; // SignUpDto | 

try {
    final response = api.authControllerSignUp(signUpDto);
    print(response);
} catch on DioException (e) {
    print('Exception when calling AuthApi->authControllerSignUp: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **signUpDto** | [**SignUpDto**](SignUpDto.md)|  | 

### Return type

[**UserDto**](UserDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authControllerVerify**
> authControllerVerify(userId, key, id)



### Example
```dart
import 'package:booklify_api/api.dart';

final api = BooklifyApi().getAuthApi();
final String userId = userId_example; // String | 
final String key = key_example; // String | 
final String id = id_example; // String | 

try {
    api.authControllerVerify(userId, key, id);
} catch on DioException (e) {
    print('Exception when calling AuthApi->authControllerVerify: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **String**|  | 
 **key** | **String**|  | 
 **id** | **String**|  | 

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

