import { User } from '@prisma/client';
import got from 'got';
import {
    Controller,
    Get,
    Put,
    Query,
    Request,
    Response,
    Route,
    Security,
    Tags,
} from 'tsoa';
import {
    getAllActivePersistentSessions,
    getUser,
    newSession,
    updateUserInformation,
} from '../data/user.manager';
import { LoginSuccessResponse, MinimalSession } from '../models/auth.model';
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
     * Get basic user information about the current user.
     */
    @Get('/info')
    @Security('bearer')
    public async userInfo(@Request() request: any): Promise<User> {
        return (await getUser(request.user.id))!;
    }
}
