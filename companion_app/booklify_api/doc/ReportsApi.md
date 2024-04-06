# booklify_api.api.ReportsApi

## Load the API package
```dart
import 'package:booklify_api/api.dart';
```

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**reportsControllerBanUser**](ReportsApi.md#reportscontrollerbanuser) | **GET** /reports/ban | 
[**reportsControllerCreateReport**](ReportsApi.md#reportscontrollercreatereport) | **POST** /reports | 
[**reportsControllerDismissReport**](ReportsApi.md#reportscontrollerdismissreport) | **GET** /reports/dismiss | 


# **reportsControllerBanUser**
> reportsControllerBanUser(key, id)



### Example
```dart
import 'package:booklify_api/api.dart';

final api = BooklifyApi().getReportsApi();
final String key = key_example; // String | 
final String id = id_example; // String | 

try {
    api.reportsControllerBanUser(key, id);
} catch on DioException (e) {
    print('Exception when calling ReportsApi->reportsControllerBanUser: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
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

# **reportsControllerCreateReport**
> reportsControllerCreateReport(createReportDto)



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getReportsApi();
final CreateReportDto createReportDto = ; // CreateReportDto | 

try {
    api.reportsControllerCreateReport(createReportDto);
} catch on DioException (e) {
    print('Exception when calling ReportsApi->reportsControllerCreateReport: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **createReportDto** | [**CreateReportDto**](CreateReportDto.md)|  | 

### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **reportsControllerDismissReport**
> reportsControllerDismissReport(key, id)



### Example
```dart
import 'package:booklify_api/api.dart';

final api = BooklifyApi().getReportsApi();
final String key = key_example; // String | 
final String id = id_example; // String | 

try {
    api.reportsControllerDismissReport(key, id);
} catch on DioException (e) {
    print('Exception when calling ReportsApi->reportsControllerDismissReport: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
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

