import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { CreateSnapshot200Response, SnapshotService } from 'src/app/api';
import {
    BookGroupingService,
    Series,
} from 'src/app/services/book-grouping.service';

@Component({
    selector: 'app-snapshot-page',
    templateUrl: './snapshot-page.component.html',
    styleUrls: ['./snapshot-page.component.scss'],
})
export class SnapshotPageComponent implements OnInit {
    public books: Series[] = [];
    public snapshot?: CreateSnapshot200Response;

    constructor(
        private snapshotService: SnapshotService,
        private groupingService: BookGroupingService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        const userId = Number(this.route.snapshot.paramMap.get('userId'));
        const snapshotId = this.route.snapshot.paramMap.get('snapshotId') || '';

        this.snapshotService
            .getSnapshot(userId, snapshotId)
            .pipe(take(1))
            .subscribe((snapshot) => {
                this.snapshot = snapshot;
                this.books = this.groupingService.processBookList(
                    snapshot.books
                );
            });
    }
}
