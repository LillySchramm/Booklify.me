import {
    Controller,
    Delete,
    Get,
    Path,
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
    invalidateSession,
    newSession,
} from '../data/user.manager';
import {
    LoginSuccessResponse,
    MinimalSession,
    RequestWithUser,
} from '../models/auth.model';

@Route('v1/session')
@Security('bearer')
@Tags('Session')
export class SessionController extends Controller {
    /**
     * Invalidates the session bound to the bearer token.
     */
    @Delete('/')
    public async invalidate(
        @Request() request: RequestWithUser
    ): Promise<void> {
        await invalidateSession(request.user.sessionId);
    }

    /**
     * Invalidates the session with the given id.
     */
    @Delete('/{id}')
    public async invalidateSessionWithId(
        @Request() request: RequestWithUser,
        @Path() id: string
    ): Promise<void> {
        await invalidateSession(id);
    }

    /**
     * Get all active persistent sessions.
     */
    @Get('/persistent')
    @Response('200')
    @Security('bearer')
    public async getAllPersistentSessions(
        @Request() request: any
    ): Promise<MinimalSession[]> {
        const sessions = await getAllActivePersistentSessions(request.user.id);
        return sessions.map((session) => ({
            id: session.id,
            createdAt: session.createdAt,
            name: session.name,
        }));
    }

    /**
     * Get a persistent Bearer Key.
     */
    @Put('/persistent')
    @Response('200')
    @Security('bearer')
    public async persistentSession(
        @Request() request: any,
        @Query() name: string
    ): Promise<LoginSuccessResponse | void> {
        const session = await newSession(request.user.id, true, name);

        return { bearer: session.bearer };
    }
}
