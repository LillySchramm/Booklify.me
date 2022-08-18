import got from 'got';
import {
    Controller,
    Get,
    Query,
    Request,
    Response,
    Route,
    Security,
    Tags,
} from 'tsoa';
import { newSession, updateUserInformation } from '../data/user.manager';
import { LoginSuccessResponse } from '../models/auth.model';
import { GitHubAuthResponse } from '../models/github.model';
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../tools/config';

@Route('v1/auth')
@Tags('Auth')
export class AuthController extends Controller {
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
                    client_id: GITHUB_CLIENT_ID,
                    client_secret: GITHUB_CLIENT_SECRET,
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

    /**
     * Get a persistent Bearer Key.
     */
    @Get('/persistent')
    @Response('200')
    @Security('bearer')
    public async persistentSession(
        @Request() request: any
    ): Promise<LoginSuccessResponse | void> {
        const session = await newSession(request.user.id, true);

        return { bearer: session.bearer };
    }
}
