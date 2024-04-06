# booklify_api.api.PublishersApi

## Load the API package
```dart
import 'package:booklify_api/api.dart';
```

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**publishersControllerGetPublisher**](PublishersApi.md#publisherscontrollergetpublisher) | **GET** /publishers/{id} | 
[**publishersControllerGetPublishers**](PublishersApi.md#publisherscontrollergetpublishers) | **POST** /publishers | 


# **publishersControllerGetPublisher**
> PublisherDto publishersControllerGetPublisher(id)



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getPublishersApi();
final String id = id_example; // String | 

try {
    final response = api.publishersControllerGetPublisher(id);
    print(response);
} catch on DioException (e) {
    print('Exception when calling PublishersApi->publishersControllerGetPublisher: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 

### Return type

[**PublisherDto**](PublisherDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **publishersControllerGetPublishers**
> PublisherListDto publishersControllerGetPublishers(getIdListDto)



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getPublishersApi();
final GetIdListDto getIdListDto = ; // GetIdListDto | 

try {
    final response = api.publishersControllerGetPublishers(getIdListDto);
    print(response);
} catch on DioException (e) {
    print('Exception when calling PublishersApi->publishersControllerGetPublishers: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **getIdListDto** | [**GetIdListDto**](GetIdListDto.md)|  | 

### Return type

[**PublisherListDto**](PublisherListDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

