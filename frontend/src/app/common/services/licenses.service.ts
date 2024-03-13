import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';

export interface License {
    name: string;
    licenseText: string;
    version: string;
    licenses: string;
    repository: string;
}

type ResponseLicenses = { [key: string]: License };

@Injectable({
    providedIn: 'root',
})
export class LicensesService {
    constructor(private readonly http: HttpClient) {}

    public getFrontendLicenses(): Observable<License[]> {
        return this.http
            .get<ResponseLicenses>('/assets/licenses/frontend_licenses.json')
            .pipe(
                take(1),
                map((licenses) => Object.values(licenses)),
            );
    }

    public getBackendLicenses(): Observable<License[]> {
        return this.http
            .get<ResponseLicenses>('/assets/licenses/backend_licenses.json')
            .pipe(
                take(1),
                map((licenses) => Object.values(licenses)),
            );
    }
}
