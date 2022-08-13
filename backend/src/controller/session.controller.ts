import { Controller, Delete, Request, Route, Security, Tags } from 'tsoa';
import { invalidateSession } from '../data/user.manager';
import { RequestWithUser } from '../models/auth.model';

@Route('v1/session')
@Security('bearer')
@Tags('Auth')
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
}
