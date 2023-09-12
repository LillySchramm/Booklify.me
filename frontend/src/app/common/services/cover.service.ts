import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CoverService {
    constructor() {}

    public getCoverUrl(id: string): string {
        return `${environment.apiUrl}/books/cover/${id}.png`;
    }
}
