import { Snapshot } from '@prisma/client';

export interface MinimalSnapshot {
    id: string;
    ttl: number;
    createdAt: Date;
}

export interface SnapshotWithNumberAsTTL {
    id: string;
    ttl: number | null;
    invalidated: boolean;
    createdAt: Date;
    userId: number;
}
