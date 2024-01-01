import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as syncFetch from 'sync-fetch';

export interface TokenInfo {
    sub: string;
    name: string;
    email: string;
    jti: string;
    iat: number;
    exp: number;
    iss: string;
    refreshToken: string;
}

let tokenService: TokenService;

export function getToken(): string | null {
    return tokenService.getToken();
}

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    private readonly tokenTimeout = 0.8;

    private refreshInProgress = false;
    private accessToken: string | null = null;

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        tokenService = this;
        this.accessToken = localStorage.getItem('accessToken');
    }

    public getToken(): string | null {
        if (this.accessToken === null) return null;

        this.refresh();

        return this.accessToken;
    }

    public setToken(token: string): void {
        this.accessToken = token;
        localStorage.setItem('accessToken', token);
    }

    public refresh(): void {
        this.accessToken = localStorage.getItem('accessToken');
        if (this.refreshInProgress || this.accessToken === null) {
            return;
        }
        this.refreshInProgress = true;

        const tokenInfo = this.getTokenInfo(this.accessToken);
        const now = new Date().getTime() / 1000;
        const tokenLife = tokenInfo.exp - tokenInfo.iat;
        const tokenLifeLeft = tokenInfo.exp - now;

        if (tokenLifeLeft < tokenLife * (1 - this.tokenTimeout)) {
            let newTokenResponse: any;
            if (tokenInfo.refreshToken) {
                newTokenResponse = syncFetch(
                    `${environment.apiUrl}/auth/refresh?token=${tokenInfo.refreshToken}&session_id=${tokenInfo.jti}`,
                );
            } else {
                newTokenResponse = syncFetch(
                    `${environment.apiUrl}/auth/token`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${this.accessToken}`,
                        },
                    },
                );
            }

            if (newTokenResponse.ok) {
                const newToken = newTokenResponse.json();
                this.setToken(newToken.accessToken);
            } else {
                this.deleteToken();
            }
        }
        this.refreshInProgress = false;
    }

    public deleteToken(): void {
        localStorage.removeItem('accessToken');
        this.accessToken = null;
    }

    public getTokenInfo(accessToken: string): TokenInfo {
        const tokenInfo = accessToken.split('.')[1];
        const decodedTokenInfo = atob(tokenInfo);
        const tokenInfoObj = JSON.parse(decodedTokenInfo);
        return tokenInfoObj;
    }
}
