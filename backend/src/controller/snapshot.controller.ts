import { Book, Snapshot, User } from '@prisma/client';
import {
    Controller,
    Delete,
    Get,
    Path,
    Put,
    Query,
    Request,
    Route,
    Security,
    Tags,
} from 'tsoa';
import {
    createNewSnapshotForUser,
    getSnapshot,
    invalidateSnapshot,
} from '../data/snapshot.manager';
import { PingResponse } from '../models/ping.model';

@Route('v1/snapshot')
@Tags('Snapshot')
export class SnapshotController extends Controller {
    /**
     * Create new snapshot.
     */
    @Put('/')
    @Security('bearer')
    public async createSnapshot(
        @Request() request: any,
        @Query() ttl: number = -1
    ): Promise<Snapshot & { user: User; books: Book[] }> {
        return createNewSnapshotForUser(request.user.id, ttl);
    }

    /**
     * Delete a snapshot.
     */
    @Delete('/{id}')
    @Security('bearer')
    public async deleteSnapshot(
        @Request() request: any,
        @Path() id: string
    ): Promise<void> {
        const snapshot = await getSnapshot(request.user.id, id);
        if (!snapshot) {
            this.setStatus(404);
            return;
        }

        invalidateSnapshot(id);
    }

    /**
     * Get a snapshot.
     */
    @Get('/{userId}/{id}')
    public async getSnapshot(
        @Path() userId: number,
        @Path() id: string
    ): Promise<(Snapshot & { user: User; books: Book[] }) | undefined> {
        const snapshot = await getSnapshot(userId, id);
        if (!snapshot) {
            this.setStatus(404);
            return;
        }

        return snapshot;
    }
}
