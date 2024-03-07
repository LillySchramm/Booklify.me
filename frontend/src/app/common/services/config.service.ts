import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as syncFetch from 'sync-fetch';

export interface FrontendConfig {
    backend?: string;
}

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    private env: FrontendConfig = {};
    private initialized = false;

    fetchConfig() {
        if (this.initialized) {
            return;
        }

        const env = syncFetch('/assets/config.json');
        this.env = env.json();

        this.initialized = true;
    }

    apiUrl(): string {
        return this.env.backend || environment.apiUrl;
    }
}
