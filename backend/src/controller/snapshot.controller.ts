import { Author, Book, Publisher, Snapshot, User } from '@prisma/client';
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
    getSnapshots,
    invalidateSnapshot,
} from '../data/snapshot.manager';
import { MinimalSnapshot } from '../models/snapshot.model';

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
    ): Promise<
        Snapshot & {
            user: User;
            books: (Book & {
                authors: Author[];
                publisher: Publisher | null;
            })[];
        }
    > {
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
     * Get all active snapshots of current user.
     */
    @Get('/all')
    @Security('bearer')
    public async getSnapshots(
        @Request() request: any
    ): Promise<MinimalSnapshot[]> {
        const snapshots = await getSnapshots(request.user.id);
        return snapshots.map((snapshot) => ({
            id: snapshot.id,
            createdAt: snapshot.createdAt,
            ttl: snapshot.ttl || -1,
        }));
    }

    /**
     * Get a snapshot.
     */
    @Get('/{userId}/{id}')
    public async getSnapshot(
        @Path() userId: number,
        @Path() id: string
    ): Promise<
        | (Snapshot & {
              user: User;
              books: (Book & {
                  authors: Author[];
                  publisher: Publisher | null;
              })[];
          })
        | undefined
    > {
        const snapshot = await getSnapshot(userId, id);
        if (!snapshot) {
            this.setStatus(404);
            return;
        }

        return snapshot;
    }
}
