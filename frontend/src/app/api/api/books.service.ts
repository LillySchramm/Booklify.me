/**
 * Booklify API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import {
    HttpClient,
    HttpContext,
    HttpEvent,
    HttpHeaders,
    HttpParameterCodec,
    HttpParams,
    HttpResponse,
} from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomHttpParameterCodec } from '../encoder';

// @ts-ignore
import { BookDto } from '../model/bookDto';
// @ts-ignore
import { BookListDto } from '../model/bookListDto';
// @ts-ignore
import { OwnershipStatusDto } from '../model/ownershipStatusDto';
// @ts-ignore
import { SetOwnershipFlagsDto } from '../model/setOwnershipFlagsDto';
// @ts-ignore
import { SetOwnershipStatusDto } from '../model/setOwnershipStatusDto';

// @ts-ignore
import { Configuration } from '../configuration';
import { BASE_PATH } from '../variables';

@Injectable({
    providedIn: 'root',
})
export class BooksService {
    protected basePath = 'http://localhost';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(
        protected httpClient: HttpClient,
        @Optional() @Inject(BASE_PATH) basePath: string | string[],
        @Optional() configuration: Configuration,
    ) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (Array.isArray(basePath) && basePath.length > 0) {
                basePath = basePath[0];
            }

            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder =
            this.configuration.encoder || new CustomHttpParameterCodec();
    }

    // @ts-ignore
    private addToHttpParams(
        httpParams: HttpParams,
        value: any,
        key?: string,
    ): HttpParams {
        if (typeof value === 'object' && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(
        httpParams: HttpParams,
        value?: any,
        key?: string,
    ): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                (value as any[]).forEach(
                    (elem) =>
                        (httpParams = this.addToHttpParamsRecursive(
                            httpParams,
                            elem,
                            key,
                        )),
                );
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(
                        key,
                        (value as Date).toISOString().substring(0, 10),
                    );
                } else {
                    throw Error('key may not be null if value is Date');
                }
            } else {
                Object.keys(value).forEach(
                    (k) =>
                        (httpParams = this.addToHttpParamsRecursive(
                            httpParams,
                            value[k],
                            key != null ? `${key}.${k}` : k,
                        )),
                );
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error('key may not be null if value is not object or array');
        }
        return httpParams;
    }

    /**
     * @param id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public booksControllerGetAllOwnedBooks(
        id: string,
        observe?: 'body',
        reportProgress?: boolean,
        options?: {
            httpHeaderAccept?: 'application/json';
            context?: HttpContext;
        },
    ): Observable<BookListDto>;
    public booksControllerGetAllOwnedBooks(
        id: string,
        observe?: 'response',
        reportProgress?: boolean,
        options?: {
            httpHeaderAccept?: 'application/json';
            context?: HttpContext;
        },
    ): Observable<HttpResponse<BookListDto>>;
    public booksControllerGetAllOwnedBooks(
        id: string,
        observe?: 'events',
        reportProgress?: boolean,
        options?: {
            httpHeaderAccept?: 'application/json';
            context?: HttpContext;
        },
    ): Observable<HttpEvent<BookListDto>>;
    public booksControllerGetAllOwnedBooks(
        id: string,
        observe: any = 'body',
        reportProgress: boolean = false,
        options?: {
            httpHeaderAccept?: 'application/json';
            context?: HttpContext;
        },
    ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error(
                'Required parameter id was null or undefined when calling booksControllerGetAllOwnedBooks.',
            );
        }

        let localVarQueryParameters = new HttpParams({ encoder: this.encoder });
        if (id !== undefined && id !== null) {
            localVarQueryParameters = this.addToHttpParams(
                localVarQueryParameters,
                <any>id,
                'id',
            );
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (bearer) required
        localVarCredential = this.configuration.lookupCredential('bearer');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set(
                'authorization',
                localVarCredential,
            );
        }

        let localVarHttpHeaderAcceptSelected: string | undefined =
            options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = ['application/json'];
            localVarHttpHeaderAcceptSelected =
                this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set(
                'Accept',
                localVarHttpHeaderAcceptSelected,
            );
        }

        let localVarHttpContext: HttpContext | undefined =
            options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (
                this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)
            ) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/books/owned`;
        return this.httpClient.request<BookListDto>(
            'get',
            `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress,
            },
        );
    }

    /**
     * @param isbn
     * @param skipCrawl
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public booksControllerGetBook(
        isbn: string,
        skipCrawl?: boolean,
        observe?: 'body',
        reportProgress?: boolean,
        options?: {
            httpHeaderAccept?: 'application/json';
            context?: HttpContext;
        },
    ): Observable<BookDto>;
    public booksControllerGetBook(
        isbn: string,
        skipCrawl?: boolean,
        observe?: 'response',
        reportProgress?: boolean,
        options?: {
            httpHeaderAccept?: 'application/json';
            context?: HttpContext;
        },
    ): Observable<HttpResponse<BookDto>>;
    public booksControllerGetBook(
        isbn: string,
        skipCrawl?: boolean,
        observe?: 'events',
        reportProgress?: boolean,
        options?: {
            httpHeaderAccept?: 'application/json';
            context?: HttpContext;
        },
    ): Observable<HttpEvent<BookDto>>;
    public booksControllerGetBook(
        isbn: string,
        skipCrawl?: boolean,
        observe: any = 'body',
        reportProgress: boolean = false,
        options?: {
            httpHeaderAccept?: 'application/json';
            context?: HttpContext;
        },
    ): Observable<any> {
        if (isbn === null || isbn === undefined) {
            throw new Error(
                'Required parameter isbn was null or undefined when calling booksControllerGetBook.',
            );
        }

        let localVarQueryParameters = new HttpParams({ encoder: this.encoder });
        if (skipCrawl !== undefined && skipCrawl !== null) {
            localVarQueryParameters = this.addToHttpParams(
                localVarQueryParameters,
                <any>skipCrawl,
                'skipCrawl',
            );
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (bearer) required
        localVarCredential = this.configuration.lookupCredential('bearer');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set(
                'authorization',
                localVarCredential,
            );
        }

        let localVarHttpHeaderAcceptSelected: string | undefined =
            options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = ['application/json'];
            localVarHttpHeaderAcceptSelected =
                this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set(
                'Accept',
                localVarHttpHeaderAcceptSelected,
            );
        }

        let localVarHttpContext: HttpContext | undefined =
            options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (
                this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)
            ) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/books/${this.configuration.encodeParam({ name: 'isbn', value: isbn, in: 'path', style: 'simple', explode: false, dataType: 'string', dataFormat: undefined })}`;
        return this.httpClient.request<BookDto>(
            'get',
            `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                params: localVarQueryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress,
            },
        );
    }

    /**
     * @param id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public booksControllerGetBookCover(
        id: string,
        observe?: 'body',
        reportProgress?: boolean,
        options?: { httpHeaderAccept?: undefined; context?: HttpContext },
    ): Observable<any>;
    public booksControllerGetBookCover(
        id: string,
        observe?: 'response',
        reportProgress?: boolean,
        options?: { httpHeaderAccept?: undefined; context?: HttpContext },
    ): Observable<HttpResponse<any>>;
    public booksControllerGetBookCover(
        id: string,
        observe?: 'events',
        reportProgress?: boolean,
        options?: { httpHeaderAccept?: undefined; context?: HttpContext },
    ): Observable<HttpEvent<any>>;
    public booksControllerGetBookCover(
        id: string,
        observe: any = 'body',
        reportProgress: boolean = false,
        options?: { httpHeaderAccept?: undefined; context?: HttpContext },
    ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error(
                'Required parameter id was null or undefined when calling booksControllerGetBookCover.',
            );
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined =
            options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [];
            localVarHttpHeaderAcceptSelected =
                this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set(
                'Accept',
                localVarHttpHeaderAcceptSelected,
            );
        }

        let localVarHttpContext: HttpContext | undefined =
            options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (
                this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)
            ) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/books/cover/${this.configuration.encodeParam({ name: 'id', value: id, in: 'path', style: 'simple', explode: false, dataType: 'string', dataFormat: undefined })}.png`;
        return this.httpClient.request<any>(
            'get',
            `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress,
            },
        );
    }

    /**
     * @param isbn
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public booksControllerGetBookOwnershipStatus(
        isbn: string,
        observe?: 'body',
        reportProgress?: boolean,
        options?: {
            httpHeaderAccept?: 'application/json';
            context?: HttpContext;
        },
    ): Observable<OwnershipStatusDto>;
    public booksControllerGetBookOwnershipStatus(
        isbn: string,
        observe?: 'response',
        reportProgress?: boolean,
        options?: {
            httpHeaderAccept?: 'application/json';
            context?: HttpContext;
        },
    ): Observable<HttpResponse<OwnershipStatusDto>>;
    public booksControllerGetBookOwnershipStatus(
        isbn: string,
        observe?: 'events',
        reportProgress?: boolean,
        options?: {
            httpHeaderAccept?: 'application/json';
            context?: HttpContext;
        },
    ): Observable<HttpEvent<OwnershipStatusDto>>;
    public booksControllerGetBookOwnershipStatus(
        isbn: string,
        observe: any = 'body',
        reportProgress: boolean = false,
        options?: {
            httpHeaderAccept?: 'application/json';
            context?: HttpContext;
        },
    ): Observable<any> {
        if (isbn === null || isbn === undefined) {
            throw new Error(
                'Required parameter isbn was null or undefined when calling booksControllerGetBookOwnershipStatus.',
            );
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (bearer) required
        localVarCredential = this.configuration.lookupCredential('bearer');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set(
                'authorization',
                localVarCredential,
            );
        }

        let localVarHttpHeaderAcceptSelected: string | undefined =
            options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = ['application/json'];
            localVarHttpHeaderAcceptSelected =
                this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set(
                'Accept',
                localVarHttpHeaderAcceptSelected,
            );
        }

        let localVarHttpContext: HttpContext | undefined =
            options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (
                this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)
            ) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/books/${this.configuration.encodeParam({ name: 'isbn', value: isbn, in: 'path', style: 'simple', explode: false, dataType: 'string', dataFormat: undefined })}/status`;
        return this.httpClient.request<OwnershipStatusDto>(
            'get',
            `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress,
            },
        );
    }

    /**
     * @param setOwnershipFlagsDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public booksControllerSetBookOwnershipFlags(
        setOwnershipFlagsDto: SetOwnershipFlagsDto,
        observe?: 'body',
        reportProgress?: boolean,
        options?: { httpHeaderAccept?: undefined; context?: HttpContext },
    ): Observable<any>;
    public booksControllerSetBookOwnershipFlags(
        setOwnershipFlagsDto: SetOwnershipFlagsDto,
        observe?: 'response',
        reportProgress?: boolean,
        options?: { httpHeaderAccept?: undefined; context?: HttpContext },
    ): Observable<HttpResponse<any>>;
    public booksControllerSetBookOwnershipFlags(
        setOwnershipFlagsDto: SetOwnershipFlagsDto,
        observe?: 'events',
        reportProgress?: boolean,
        options?: { httpHeaderAccept?: undefined; context?: HttpContext },
    ): Observable<HttpEvent<any>>;
    public booksControllerSetBookOwnershipFlags(
        setOwnershipFlagsDto: SetOwnershipFlagsDto,
        observe: any = 'body',
        reportProgress: boolean = false,
        options?: { httpHeaderAccept?: undefined; context?: HttpContext },
    ): Observable<any> {
        if (
            setOwnershipFlagsDto === null ||
            setOwnershipFlagsDto === undefined
        ) {
            throw new Error(
                'Required parameter setOwnershipFlagsDto was null or undefined when calling booksControllerSetBookOwnershipFlags.',
            );
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (bearer) required
        localVarCredential = this.configuration.lookupCredential('bearer');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set(
                'authorization',
                localVarCredential,
            );
        }

        let localVarHttpHeaderAcceptSelected: string | undefined =
            options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [];
            localVarHttpHeaderAcceptSelected =
                this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set(
                'Accept',
                localVarHttpHeaderAcceptSelected,
            );
        }

        let localVarHttpContext: HttpContext | undefined =
            options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }

        // to determine the Content-Type header
        const consumes: string[] = ['application/json'];
        const httpContentTypeSelected: string | undefined =
            this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set(
                'Content-Type',
                httpContentTypeSelected,
            );
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (
                this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)
            ) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/books/status`;
        return this.httpClient.request<any>(
            'post',
            `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                body: setOwnershipFlagsDto,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress,
            },
        );
    }

    /**
     * @param isbn
     * @param setOwnershipStatusDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public booksControllerSetBookOwnershipStatus(
        isbn: string,
        setOwnershipStatusDto: SetOwnershipStatusDto,
        observe?: 'body',
        reportProgress?: boolean,
        options?: {
            httpHeaderAccept?: 'application/json';
            context?: HttpContext;
        },
    ): Observable<OwnershipStatusDto>;
    public booksControllerSetBookOwnershipStatus(
        isbn: string,
        setOwnershipStatusDto: SetOwnershipStatusDto,
        observe?: 'response',
        reportProgress?: boolean,
        options?: {
            httpHeaderAccept?: 'application/json';
            context?: HttpContext;
        },
    ): Observable<HttpResponse<OwnershipStatusDto>>;
    public booksControllerSetBookOwnershipStatus(
        isbn: string,
        setOwnershipStatusDto: SetOwnershipStatusDto,
        observe?: 'events',
        reportProgress?: boolean,
        options?: {
            httpHeaderAccept?: 'application/json';
            context?: HttpContext;
        },
    ): Observable<HttpEvent<OwnershipStatusDto>>;
    public booksControllerSetBookOwnershipStatus(
        isbn: string,
        setOwnershipStatusDto: SetOwnershipStatusDto,
        observe: any = 'body',
        reportProgress: boolean = false,
        options?: {
            httpHeaderAccept?: 'application/json';
            context?: HttpContext;
        },
    ): Observable<any> {
        if (isbn === null || isbn === undefined) {
            throw new Error(
                'Required parameter isbn was null or undefined when calling booksControllerSetBookOwnershipStatus.',
            );
        }
        if (
            setOwnershipStatusDto === null ||
            setOwnershipStatusDto === undefined
        ) {
            throw new Error(
                'Required parameter setOwnershipStatusDto was null or undefined when calling booksControllerSetBookOwnershipStatus.',
            );
        }

        let localVarHeaders = this.defaultHeaders;

        let localVarCredential: string | undefined;
        // authentication (bearer) required
        localVarCredential = this.configuration.lookupCredential('bearer');
        if (localVarCredential) {
            localVarHeaders = localVarHeaders.set(
                'authorization',
                localVarCredential,
            );
        }

        let localVarHttpHeaderAcceptSelected: string | undefined =
            options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = ['application/json'];
            localVarHttpHeaderAcceptSelected =
                this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set(
                'Accept',
                localVarHttpHeaderAcceptSelected,
            );
        }

        let localVarHttpContext: HttpContext | undefined =
            options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }

        // to determine the Content-Type header
        const consumes: string[] = ['application/json'];
        const httpContentTypeSelected: string | undefined =
            this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            localVarHeaders = localVarHeaders.set(
                'Content-Type',
                httpContentTypeSelected,
            );
        }

        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (
                this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)
            ) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/books/${this.configuration.encodeParam({ name: 'isbn', value: isbn, in: 'path', style: 'simple', explode: false, dataType: 'string', dataFormat: undefined })}/status`;
        return this.httpClient.request<OwnershipStatusDto>(
            'post',
            `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                body: setOwnershipStatusDto,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                reportProgress: reportProgress,
            },
        );
    }
}
