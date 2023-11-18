import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TranslocoModule } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { TimeagoModule } from 'ngx-timeago';
import { Observable } from 'rxjs';
import { SessionDto } from 'src/app/api';
import { UserActions } from 'src/app/state/user/user.actions';
import { UserState } from 'src/app/state/user/user.state';

@UntilDestroy()
@Component({
    selector: 'app-session-table',
    standalone: true,
    imports: [
        CommonModule,
        MatTableModule,
        MatIconModule,
        MatIconModule,
        TranslocoModule,
        MatButtonModule,
        TimeagoModule,
    ],
    templateUrl: './session-table.component.html',
    styleUrls: ['./session-table.component.scss'],
})
export class SessionTableComponent {
    @Select(UserState.sessions)
    sessions$!: Observable<SessionDto[] | undefined>;
    $sessions = toSignal(this.sessions$);

    @Select(UserState.session)
    session$!: Observable<SessionDto | undefined>;
    $session = toSignal(this.session$);

    displayedColumns: string[] = ['name', 'created', 'lastUsed', 'actions'];
    dataSource: SessionDto[] = [];

    constructor(private store: Store) {
        this.sessions$.pipe(untilDestroyed(this)).subscribe((sessions) => {
            if (sessions) {
                sessions.sort((a, b) => {
                    if (!a.lastUsed && !b.lastUsed) {
                        return 0;
                    }

                    return a.lastUsed! < b.lastUsed! ? 1 : -1;
                });
            }
            this.dataSource = sessions || [];
        });
    }

    invalidate(sessionId: string) {
        this.store.dispatch(new UserActions.InvalidateSession(sessionId));
    }
}
