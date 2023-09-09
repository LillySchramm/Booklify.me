import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface TokenInfo {
    sub: string;
    name: string;
    email: string;
    jti: string;
    iat: number;
    exp: number;
    iss: string;
}

let tokenService: TokenService;

export function getToken(): string | null {
    return tokenService.getToken();
}

@Injectable({
    providedIn: 'root',
})
export class TokenService {
    private readonly tokenTimeout = 0.5;

    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        tokenService = this;
    }

    public getToken(): string | null {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken === null) return null;

        this.refresh(accessToken).then(() => {});

        return localStorage.getItem('accessToken');
    }

    private async refresh(accessToken: string): Promise<void> {
        const tokenInfo = this.getTokenInfo(accessToken);
        const now = new Date().getTime() / 1000;
        const tokenLife = tokenInfo.exp - tokenInfo.iat;
        const tokenLifeLeft = tokenInfo.exp - now;

        if (tokenInfo.exp < now) {
            this.deleteToken();
        }

        if (tokenLifeLeft < tokenLife * (1 - this.tokenTimeout)) {
            const newTokenResponse = await fetch(
                `${environment.apiUrl}/auth/token`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${accessToken}`,
                    },
                },
            );

            if (newTokenResponse.ok) {
                const newToken = await newTokenResponse.json();
                localStorage.setItem('accessToken', newToken.accessToken);
            } else {
                this.deleteToken();
            }
        }
    }

    public deleteToken(): void {
        localStorage.removeItem('accessToken');
    }

    public getTokenInfo(accessToken: string): TokenInfo {
        const tokenInfo = accessToken.split('.')[1];
        const decodedTokenInfo = atob(tokenInfo);
        const tokenInfoObj = JSON.parse(decodedTokenInfo);
        return tokenInfoObj;
    }
}
