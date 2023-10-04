import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BookActions } from 'src/app/state/books/books.actions';
import { BooksState } from 'src/app/state/books/books.state';
import { UiActions } from 'src/app/state/ui/ui.actions';
import { UserActions } from 'src/app/state/user/user.actions';
import { UserState } from 'src/app/state/user/user.state';
import { CollectionDisplayComponent } from '../home/collection-display/collection-display.component';

@UntilDestroy()
@Component({
    selector: 'app-user-collection',
    standalone: true,
    imports: [CommonModule, CollectionDisplayComponent],
    templateUrl: './user-collection.component.html',
    styleUrls: ['./user-collection.component.scss'],
})
export class UserCollectionComponent implements OnInit {
    @Select(BooksState.totalBookCount) totalBookCount$!: Observable<number>;
    $totalBookCount = toSignal(this.totalBookCount$);

    constructor(
        private store: Store,
        private route: ActivatedRoute,
        private transloco: TranslocoService,
    ) {}

    ngOnInit(): void {
        const name = this.route.snapshot.params['name'];
        this.store.dispatch(new UserActions.LoadUser());
        this.store.dispatch(new UserActions.LoadUserByNickname(name));

        this.store.dispatch(new UiActions.ChangeSidenavVisibility(true));
        this.store.dispatch(new UiActions.ChangePageTitle(undefined));
        this.store.dispatch(new UiActions.ChangePageSubtitle(''));
        this.store.dispatch(new UiActions.ChangeInfoVisibility(false));
        this.store.dispatch(new UiActions.ChangeSidenavMode('collection'));

        this.store
            .select(UserState.user(name))
            .pipe(untilDestroyed(this))
            .subscribe((user) => {
                if (!user) return;

                this.store.dispatch(
                    new UiActions.ChangePageTitle(
                        this.transloco.translate('titles.user-collection', {
                            name: user.name,
                        }),
                    ),
                );

                this.store.dispatch([
                    new BookActions.LoadBooksOfUser(user.id),
                    new BookActions.LoadBookGroupsOfUser(user.id),
                ]);
            });

        this.totalBookCount$.pipe(untilDestroyed(this)).subscribe((count) => {
            if (count === undefined) return;

            this.store.dispatch(
                new UiActions.ChangePageSubtitle(
                    this.transloco.translate('subtitles.collection', {
                        count: count,
                    }),
                ),
            );
        });
    }
}
