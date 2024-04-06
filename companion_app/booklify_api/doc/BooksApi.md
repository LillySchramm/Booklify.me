# booklify_api.api.BooksApi

## Load the API package
```dart
import 'package:booklify_api/api.dart';
```

All URIs are relative to *http://localhost*

Method | HTTP request | Description
------------- | ------------- | -------------
[**booksControllerGetAllOwnedBooks**](BooksApi.md#bookscontrollergetallownedbooks) | **GET** /books/owned | 
[**booksControllerGetBook**](BooksApi.md#bookscontrollergetbook) | **GET** /books/{isbn} | 
[**booksControllerGetBookCover**](BooksApi.md#bookscontrollergetbookcover) | **GET** /books/cover/{id}.png | 
[**booksControllerGetBookOwnershipStatus**](BooksApi.md#bookscontrollergetbookownershipstatus) | **GET** /books/{isbn}/status | 
[**booksControllerSetBookOwnershipFlags**](BooksApi.md#bookscontrollersetbookownershipflags) | **POST** /books/status | 
[**booksControllerSetBookOwnershipStatus**](BooksApi.md#bookscontrollersetbookownershipstatus) | **POST** /books/{isbn}/status | 


# **booksControllerGetAllOwnedBooks**
> BookListDto booksControllerGetAllOwnedBooks(id)



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getBooksApi();
final String id = id_example; // String | 

try {
    final response = api.booksControllerGetAllOwnedBooks(id);
    print(response);
} catch on DioException (e) {
    print('Exception when calling BooksApi->booksControllerGetAllOwnedBooks: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 

### Return type

[**BookListDto**](BookListDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **booksControllerGetBook**
> BookDto booksControllerGetBook(isbn, skipCrawl)



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getBooksApi();
final String isbn = isbn_example; // String | 
final bool skipCrawl = true; // bool | 

try {
    final response = api.booksControllerGetBook(isbn, skipCrawl);
    print(response);
} catch on DioException (e) {
    print('Exception when calling BooksApi->booksControllerGetBook: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **isbn** | **String**|  | 
 **skipCrawl** | **bool**|  | [optional] 

### Return type

[**BookDto**](BookDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **booksControllerGetBookCover**
> booksControllerGetBookCover(id)



### Example
```dart
import 'package:booklify_api/api.dart';

final api = BooklifyApi().getBooksApi();
final String id = id_example; // String | 

try {
    api.booksControllerGetBookCover(id);
} catch on DioException (e) {
    print('Exception when calling BooksApi->booksControllerGetBookCover: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**|  | 

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **booksControllerGetBookOwnershipStatus**
> OwnershipStatusDto booksControllerGetBookOwnershipStatus(isbn)



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getBooksApi();
final String isbn = isbn_example; // String | 

try {
    final response = api.booksControllerGetBookOwnershipStatus(isbn);
    print(response);
} catch on DioException (e) {
    print('Exception when calling BooksApi->booksControllerGetBookOwnershipStatus: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **isbn** | **String**|  | 

### Return type

[**OwnershipStatusDto**](OwnershipStatusDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **booksControllerSetBookOwnershipFlags**
> booksControllerSetBookOwnershipFlags(setOwnershipFlagsDto)



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getBooksApi();
final SetOwnershipFlagsDto setOwnershipFlagsDto = ; // SetOwnershipFlagsDto | 

try {
    api.booksControllerSetBookOwnershipFlags(setOwnershipFlagsDto);
} catch on DioException (e) {
    print('Exception when calling BooksApi->booksControllerSetBookOwnershipFlags: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **setOwnershipFlagsDto** | [**SetOwnershipFlagsDto**](SetOwnershipFlagsDto.md)|  | 

### Return type

void (empty response body)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: Not defined

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **booksControllerSetBookOwnershipStatus**
> OwnershipStatusDto booksControllerSetBookOwnershipStatus(isbn, setOwnershipStatusDto)



### Example
```dart
import 'package:booklify_api/api.dart';
// TODO Configure API key authorization: bearer
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKey = 'YOUR_API_KEY';
// uncomment below to setup prefix (e.g. Bearer) for API key, if needed
//defaultApiClient.getAuthentication<ApiKeyAuth>('bearer').apiKeyPrefix = 'Bearer';

final api = BooklifyApi().getBooksApi();
final String isbn = isbn_example; // String | 
final SetOwnershipStatusDto setOwnershipStatusDto = ; // SetOwnershipStatusDto | 

try {
    final response = api.booksControllerSetBookOwnershipStatus(isbn, setOwnershipStatusDto);
    print(response);
} catch on DioException (e) {
    print('Exception when calling BooksApi->booksControllerSetBookOwnershipStatus: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **isbn** | **String**|  | 
 **setOwnershipStatusDto** | [**SetOwnershipStatusDto**](SetOwnershipStatusDto.md)|  | 

### Return type

[**OwnershipStatusDto**](OwnershipStatusDto.md)

### Authorization

[bearer](../README.md#bearer)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

