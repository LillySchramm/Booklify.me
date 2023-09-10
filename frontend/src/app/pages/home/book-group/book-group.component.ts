import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngxs/store';
import { Observable, map } from 'rxjs';
import { BookDto, BookGroupDto } from 'src/app/api';
import { BooksState } from 'src/app/state/books/books.state';
import { BookCardComponent } from '../book-card/book-card.component';

@UntilDestroy()
@Component({
    selector: 'app-book-group',
    standalone: true,
    imports: [
        CommonModule,
        TranslocoModule,
        MatExpansionModule,
        BookCardComponent,
    ],
    templateUrl: './book-group.component.html',
    styleUrls: ['./book-group.component.scss'],
})
export class BookGroupComponent implements OnInit {
    @Input() groupId!: string;
    @Input() books!: BookDto[];

    group$?: Observable<BookGroupDto>;

    constructor(
        private store: Store,
        private transloco: TranslocoService,
    ) {}

    ngOnInit(): void {
        this.group$ = this.store.select(BooksState.group(this.groupId)).pipe(
            untilDestroyed(this),
            map((group) => {
                if (!group) {
                    return {
                        id: this.groupId,
                        name: this.transloco.translate('book-groups.unknown'),
                    } as BookGroupDto;
                }
                return group;
            }),
        );

        this.group$.subscribe();
    }

    trackById(index: number, element: BookDto): string {
        return element.isbn;
    }
}
