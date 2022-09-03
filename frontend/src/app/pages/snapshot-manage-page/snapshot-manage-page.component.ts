import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthService, MinimalSnapshot, SnapshotService } from 'src/app/api';
import prettyMilliseconds from 'pretty-ms';

interface Duration {
    name: string;
    duration: number;
}

@Component({
    selector: 'app-snapshot-manage-page',
    templateUrl: './snapshot-manage-page.component.html',
    styleUrls: ['./snapshot-manage-page.component.scss'],
})
export class SnapshotManagePageComponent implements OnInit {
    public snapshots: MinimalSnapshot[] = [];
    private userId = 0;

    public durations: Duration[] = [
        {
            duration: -1,
            name: 'Never',
        },
    ];
    public selectedDuration = -1;

    constructor(
        private snapshotService: SnapshotService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.reloadSnapshots();

        this.authService
            .userInfo()
            .pipe(take(1))
            .subscribe((info) => {
                this.userId = info.id;
            });

        const hour = 1000 * 60 * 60;
        const day = hour * 24;
        [hour, hour * 12, day, day * 7, day * 30, day * 365].forEach(
            (duration) => {
                this.durations.push({
                    duration,
                    name: prettyMilliseconds(duration),
                });
            }
        );
    }

    private reloadSnapshots(): void {
        this.snapshotService
            .getSnapshots()
            .pipe(take(1))
            .subscribe((snapshots) => {
                this.snapshots = snapshots;
            });
    }

    public viewSnapshot(snapshot: MinimalSnapshot) {
        window.open(`/snapshot/${this.userId}/${snapshot.id}`, '_blank');
    }

    public createSnapshot(): void {
        this.snapshotService
            .createSnapshot(this.selectedDuration)
            .pipe(take(1))
            .subscribe(() => this.reloadSnapshots());
    }

    public deleteSnapshot(snapshot: MinimalSnapshot) {
        this.snapshotService
            .deleteSnapshot(snapshot.id)
            .pipe(take(1))
            .subscribe(() => this.reloadSnapshots());
    }
}
