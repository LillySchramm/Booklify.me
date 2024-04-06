# booklify_api.api.UsersApi

## Load the API package
```dart
import 'package:booklify_api/api.dart';
```

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**usersControllerGetUser**](UsersApi.md#userscontrollergetuser) | **GET** /users | 
[**usersControllerGetUserFlags**](UsersApi.md#userscontrollergetuserflags) | **GET** /users/flags | 
[**usersControllerPatchUserFlags**](UsersApi.md#userscontrollerpatchuserflags) | **PATCH** /users/flags | 


# **usersControllerGetUser**
> BasicUserDto usersControllerGetUser(id, name)



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getUsersApi();
final String id = id_example; // String | 
final String name = name_example; // String | 

try {
    final response = api.usersControllerGetUser(id, name);
    print(response);
} catch on DioException (e) {
    print('Exception when calling UsersApi->usersControllerGetUser: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **name** | **String**|  | 

### Return type

[**BasicUserDto**](BasicUserDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersControllerGetUserFlags**
> UserFlagsDto usersControllerGetUserFlags()



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getUsersApi();

try {
    final response = api.usersControllerGetUserFlags();
    print(response);
} catch on DioException (e) {
    print('Exception when calling UsersApi->usersControllerGetUserFlags: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**UserFlagsDto**](UserFlagsDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **usersControllerPatchUserFlags**
> UserFlagsDto usersControllerPatchUserFlags(userFlagsPatchDto)



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getUsersApi();
final UserFlagsPatchDto userFlagsPatchDto = ; // UserFlagsPatchDto | 

try {
    final response = api.usersControllerPatchUserFlags(userFlagsPatchDto);
    print(response);
} catch on DioException (e) {
    print('Exception when calling UsersApi->usersControllerPatchUserFlags: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userFlagsPatchDto** | [**UserFlagsPatchDto**](UserFlagsPatchDto.md)|  | 

### Return type

[**UserFlagsDto**](UserFlagsDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

