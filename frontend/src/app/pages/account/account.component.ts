import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { Store } from '@ngxs/store';
import { take } from 'rxjs';
import { UiActions } from 'src/app/state/ui/ui.actions';
import { UserActions } from 'src/app/state/user/user.actions';
import { DeleteAccountDialogComponent } from './delete-account-dialog/delete-account-dialog.component';

@Component({
    selector: 'app-account',
    standalone: true,
    imports: [
        CommonModule,
        MatDividerModule,
        TranslocoModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
    ],
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
    constructor(
        private store: Store,
        public dialog: MatDialog,
    ) {
        this.store.dispatch(new UserActions.LoadUser());
        this.store.dispatch(new UiActions.ChangeSidenavVisibility(true));
        this.store.dispatch(new UiActions.ChangePageTitle('titles.account'));
        this.store.dispatch(new UiActions.ChangePageSubtitle(undefined));
        this.store.dispatch(new UiActions.ChangeInfoVisibility(false));
        this.store.dispatch(new UiActions.ChangeSidenavMode('account'));
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
}
