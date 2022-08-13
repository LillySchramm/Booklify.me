export interface GitHubAuthResponse {
    access_token: string;
    token_type: string;
    scope: string;
    error?: string;
}

export interface GitHubUserResponse {
    id: number;
    name: string;
}
