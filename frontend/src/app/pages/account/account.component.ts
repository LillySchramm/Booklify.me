import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {
    MatSlideToggleChange,
    MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { TranslocoModule } from '@ngneat/transloco';
import { Select, Store } from '@ngxs/store';
import { Observable, take } from 'rxjs';
import { UiActions } from 'src/app/state/ui/ui.actions';
import { UserActions } from 'src/app/state/user/user.actions';
import { UserState } from 'src/app/state/user/user.state';
import { DeleteAccountDialogComponent } from './delete-account-dialog/delete-account-dialog.component';
import { NewPasswordFormComponent } from './new-password-form/new-password-form.component';
import { SessionTableComponent } from './session-table/session-table.component';

@Component({
    selector: 'app-account',
    standalone: true,
    imports: [
        MatDividerModule,
        TranslocoModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        MatSlideToggleModule,
        NewPasswordFormComponent,
        SessionTableComponent,
    ],
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
    @Select(UserState.selectUserFlags)
    userFlags$!: Observable<any | undefined>;
    $userFlags = toSignal(this.userFlags$);

    constructor(
        private store: Store,
        public dialog: MatDialog,
    ) {
        this.store.dispatch(new UserActions.LoadUser());
        this.store.dispatch(new UserActions.LoadUserFlags());
        this.store.dispatch(new UserActions.LoadAllSessions());
        this.store.dispatch(new UiActions.ChangeSidenavVisibility(true));
        this.store.dispatch(new UiActions.ChangePageTitle('titles.account'));
        this.store.dispatch(new UiActions.ChangePageSubtitle(undefined));
        this.store.dispatch(new UiActions.ChangeInfoVisibility(false));
        this.store.dispatch(new UiActions.ChangeSidenavMode('account'));
        this.store.dispatch(new UiActions.ChangeReportId(undefined));
    }

    export() {
        this.store.dispatch(new UserActions.ExportUser());
    }

    deleteAccount() {
        this.dialog
            .open(DeleteAccountDialogComponent)
            .afterClosed()
            .pipe(take(1))
            .subscribe((result) => {
                if (result) {
                    this.store.dispatch(new UserActions.DeleteUser());
                }
            });
    }

    changePublic(event: MatSlideToggleChange) {
        this.store.dispatch(new UserActions.ChangeVisibility(event.checked));
    }
}
