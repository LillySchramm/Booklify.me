import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SessionDto } from 'src/app/api';
import { BookActions } from 'src/app/state/books/books.actions';
import { UiActions } from 'src/app/state/ui/ui.actions';
import { UserActions } from 'src/app/state/user/user.actions';
import { UserState } from 'src/app/state/user/user.state';

@UntilDestroy()
@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    @Select(UserState.session) session$!: Observable<SessionDto | undefined>;
    $session = toSignal(this.session$);

    constructor(private store: Store) {
        this.store.dispatch(new UserActions.LoadUser());
        this.store.dispatch(new UiActions.ChangeSidenavVisibility(true));
        this.store.dispatch(new UiActions.ChangePageTitle('titles.collection'));

        this.session$.pipe(untilDestroyed(this)).subscribe((session) => {
            if (!session) return;

            this.store.dispatch([
                new BookActions.LoadBooksOfUser(session.userId),
                new BookActions.LoadBookGroupsOfUser(session.userId),
            ]);
        });
    }
}
