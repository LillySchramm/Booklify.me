# booklify_api.api.SystemApi

## Load the API package
```dart
import 'package:booklify_api/api.dart';
```

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**systemControllerGetSystemHealth**](SystemApi.md#systemcontrollergetsystemhealth) | **GET** /system/health | 
[**systemControllerGetSystemInfo**](SystemApi.md#systemcontrollergetsysteminfo) | **GET** /system/info | 
[**systemControllerReset**](SystemApi.md#systemcontrollerreset) | **POST** /system/reset | 


# **systemControllerGetSystemHealth**
> SystemHealthDto systemControllerGetSystemHealth()



### Example
```dart
import 'package:booklify_api/api.dart';

final api = BooklifyApi().getSystemApi();

try {
    final response = api.systemControllerGetSystemHealth();
    print(response);
} catch on DioException (e) {
    print('Exception when calling SystemApi->systemControllerGetSystemHealth: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**SystemHealthDto**](SystemHealthDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **systemControllerGetSystemInfo**
> SystemInfoDto systemControllerGetSystemInfo()



### Example
```dart
import 'package:booklify_api/api.dart';

final api = BooklifyApi().getSystemApi();

try {
    final response = api.systemControllerGetSystemInfo();
    print(response);
} catch on DioException (e) {
    print('Exception when calling SystemApi->systemControllerGetSystemInfo: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**SystemInfoDto**](SystemInfoDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **systemControllerReset**
> SystemInfoDto systemControllerReset()



### Example
```dart
import 'package:booklify_api/api.dart';

final api = BooklifyApi().getSystemApi();

try {
    final response = api.systemControllerReset();
    print(response);
} catch on DioException (e) {
    print('Exception when calling SystemApi->systemControllerReset: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**SystemInfoDto**](SystemInfoDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

