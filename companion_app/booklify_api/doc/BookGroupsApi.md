# booklify_api.api.BookGroupsApi

## Load the API package
```dart
import 'package:booklify_api/api.dart';
```

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**bookGroupsControllerGetAllBookGroups**](BookGroupsApi.md#bookgroupscontrollergetallbookgroups) | **GET** /book-groups | 


# **bookGroupsControllerGetAllBookGroups**
> BookGroupListDto bookGroupsControllerGetAllBookGroups(id)



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getBookGroupsApi();
final String id = id_example; // String | 

try {
    final response = api.bookGroupsControllerGetAllBookGroups(id);
    print(response);
} catch on DioException (e) {
    print('Exception when calling BookGroupsApi->bookGroupsControllerGetAllBookGroups: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 

### Return type

[**BookGroupListDto**](BookGroupListDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

