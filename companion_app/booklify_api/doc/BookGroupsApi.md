# booklify_api.api.BookGroupsApi

## Load the API package
```dart
import 'package:booklify_api/api.dart';
```

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**bookGroupsControllerCreateBookGroup**](BookGroupsApi.md#bookgroupscontrollercreatebookgroup) | **POST** /book-groups | 
[**bookGroupsControllerDeleteBookGroup**](BookGroupsApi.md#bookgroupscontrollerdeletebookgroup) | **DELETE** /book-groups/{id} | 
[**bookGroupsControllerGetAllBookGroups**](BookGroupsApi.md#bookgroupscontrollergetallbookgroups) | **GET** /book-groups | 
[**bookGroupsControllerUpdateBookGroup**](BookGroupsApi.md#bookgroupscontrollerupdatebookgroup) | **PATCH** /book-groups/{id} | 


# **bookGroupsControllerCreateBookGroup**
> BookGroupDto bookGroupsControllerCreateBookGroup(bookGroupPostDto)



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getBookGroupsApi();
final BookGroupPostDto bookGroupPostDto = ; // BookGroupPostDto | 

try {
    final response = api.bookGroupsControllerCreateBookGroup(bookGroupPostDto);
    print(response);
} catch on DioException (e) {
    print('Exception when calling BookGroupsApi->bookGroupsControllerCreateBookGroup: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **bookGroupPostDto** | [**BookGroupPostDto**](BookGroupPostDto.md)|  | 

### Return type

[**BookGroupDto**](BookGroupDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **bookGroupsControllerDeleteBookGroup**
> bookGroupsControllerDeleteBookGroup(id)



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
    api.bookGroupsControllerDeleteBookGroup(id);
} catch on DioException (e) {
    print('Exception when calling BookGroupsApi->bookGroupsControllerDeleteBookGroup: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 

### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

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

# **bookGroupsControllerUpdateBookGroup**
> BookGroupDto bookGroupsControllerUpdateBookGroup(id, bookGroupPatchDto)



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getBookGroupsApi();
final String id = id_example; // String | 
final BookGroupPatchDto bookGroupPatchDto = ; // BookGroupPatchDto | 

try {
    final response = api.bookGroupsControllerUpdateBookGroup(id, bookGroupPatchDto);
    print(response);
} catch on DioException (e) {
    print('Exception when calling BookGroupsApi->bookGroupsControllerUpdateBookGroup: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 
 **bookGroupPatchDto** | [**BookGroupPatchDto**](BookGroupPatchDto.md)|  | 

### Return type

[**BookGroupDto**](BookGroupDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

