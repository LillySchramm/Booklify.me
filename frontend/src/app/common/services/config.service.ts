import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface FrontendConfig {
    backend?: string;
}

@Injectable({
    providedIn: 'root',
})
export class ConfigService {
    private env: FrontendConfig = {};
    private initialized = false;

    async fetchConfig() {
        if (this.initialized) {
            return;
        }

        const env = await fetch('/assets/config.json');
        this.env = await env.json();

        this.initialized = true;
    }

    apiUrl(): string {
        return this.env.backend || environment.apiUrl;
    }
}
