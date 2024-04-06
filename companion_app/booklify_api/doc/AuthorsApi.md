# booklify_api.api.AuthorsApi

## Load the API package
```dart
import 'package:booklify_api/api.dart';
```

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**authorsControllerGetAuthor**](AuthorsApi.md#authorscontrollergetauthor) | **GET** /authors/{id} | 
[**authorsControllerGetAuthors**](AuthorsApi.md#authorscontrollergetauthors) | **POST** /authors | 


# **authorsControllerGetAuthor**
> AuthorDto authorsControllerGetAuthor(id)



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getAuthorsApi();
final String id = id_example; // String | 

try {
    final response = api.authorsControllerGetAuthor(id);
    print(response);
} catch on DioException (e) {
    print('Exception when calling AuthorsApi->authorsControllerGetAuthor: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 

### Return type

[**AuthorDto**](AuthorDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authorsControllerGetAuthors**
> AuthorListDto authorsControllerGetAuthors(getIdListDto)



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getAuthorsApi();
final GetIdListDto getIdListDto = ; // GetIdListDto | 

try {
    final response = api.authorsControllerGetAuthors(getIdListDto);
    print(response);
} catch on DioException (e) {
    print('Exception when calling AuthorsApi->authorsControllerGetAuthors: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **getIdListDto** | [**GetIdListDto**](GetIdListDto.md)|  | 

### Return type

[**AuthorListDto**](AuthorListDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

