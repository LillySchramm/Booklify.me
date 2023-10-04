import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { Store } from '@ngxs/store';
import { UiActions } from 'src/app/state/ui/ui.actions';
import { UserActions } from 'src/app/state/user/user.actions';

@Component({
    selector: 'app-account',
    standalone: true,
    imports: [
        CommonModule,
        MatDividerModule,
        TranslocoModule,
        MatButtonModule,
        MatIconModule,
    ],
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
    constructor(private store: Store) {
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
}
