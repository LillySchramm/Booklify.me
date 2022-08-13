import got from 'got';
import { env } from 'process';
import { Controller, Get, Path, Query, Response, Route } from 'tsoa';
import { newSession, updateUserInformation } from '../data/user.manager';
import { LoginSuccessResponse } from '../models/auth.model';
import { GitHubAuthResponse } from '../models/github.model';
import { PingResponse } from '../models/ping.model';

@Route('v1/auth')
export class AuthController extends Controller {
    private clientId = env.GITHUB_CLIENT_ID;
    private clientSecret = env.GITHUB_CLIENT_SECRET;

    /**
     * Authentication via GitHub.
     */
    @Get('/')
    @Response('401')
    public async auth(
        @Query() code: string
    ): Promise<LoginSuccessResponse | void> {
        const authResponse: GitHubAuthResponse = await got
            .post('https://github.com/login/oauth/access_token', {
                json: {
                    client_id: this.clientId,
                    client_secret: this.clientSecret,
                    code,
                    accept: 'json',
                },
            })
            .json();

        if (authResponse.error) {
            this.setStatus(401);
            return;
        }

        const user = await updateUserInformation(authResponse.access_token);
        const session = await newSession(user.id);

        return { bearer: session.bearer };
    }
}
