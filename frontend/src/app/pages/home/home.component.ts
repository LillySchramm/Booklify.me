import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoService } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SessionDto } from 'src/app/api';
import { BookActions } from 'src/app/state/books/books.actions';
import { BooksState } from 'src/app/state/books/books.state';
import { UiActions } from 'src/app/state/ui/ui.actions';
import { UserActions } from 'src/app/state/user/user.actions';
import { UserState } from 'src/app/state/user/user.state';
import { CollectionDisplayComponent } from './collection-display/collection-display.component';

@UntilDestroy()
@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CollectionDisplayComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    @Select(UserState.session) session$!: Observable<SessionDto | undefined>;
    $session = toSignal(this.session$);

    @Select(BooksState.totalBookCount) totalBookCount$!: Observable<number>;
    $totalBookCount = toSignal(this.totalBookCount$);

    constructor(
        private store: Store,
        private transloco: TranslocoService,
    ) {
        this.store.dispatch(new UserActions.LoadUser());
        this.store.dispatch(new UiActions.ChangeSidenavVisibility(true));
        this.store.dispatch(new UiActions.ChangePageTitle('titles.collection'));
        this.store.dispatch(new UiActions.ChangePageSubtitle(''));
        this.store.dispatch(new UiActions.ChangeSidenavMode('collection'));
        this.store.dispatch(new UiActions.ChangeInfoVisibility(false));
        this.store.dispatch(new UiActions.ChangeReportId(undefined));

        this.session$.pipe(untilDestroyed(this)).subscribe((session) => {
            if (!session) return;

            this.store.dispatch([
                new BookActions.LoadBooksOfUser(session.userId),
                new BookActions.LoadBookGroupsOfUser(session.userId),
            ]);
        });

        this.totalBookCount$.pipe(untilDestroyed(this)).subscribe((count) => {
            if (count === undefined) return;

            this.store.dispatch(
                new UiActions.ChangePageSubtitle(
                    transloco.translate('subtitles.collection', { count }),
                ),
            );
        });
    }
}
