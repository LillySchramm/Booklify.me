import { Component, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SnackBarService } from './common/services/snack-bar.service';
import { TokenService } from './common/services/token.service';
import { UiService } from './common/services/ui.service';
import { SystemActions } from './state/system/system.actions';
import { UiActions } from './state/ui/ui.actions';
import { UiState } from './state/ui/ui.state';

@UntilDestroy()
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    @Select(UiState.isSidenavVisible) isSidenavVisible$!: Observable<boolean>;
    $isSidenavVisible = toSignal(this.isSidenavVisible$);

    @Select(UiState.isInfoVisible) isInfoVisible$!: Observable<boolean>;
    $isInfoVisible = toSignal(this.isInfoVisible$);

    innerWidth = window.innerWidth;

    @ViewChild('sideNav', { read: MatDrawer, static: false }) sideNav:
        | MatDrawer
        | undefined;

    constructor(
        private snackBar: SnackBarService,
        private _snackBar: MatSnackBar,
        private _token: TokenService,
        private store: Store,
        public ui: UiService,
    ) {
        this.snackBar.message$.subscribe((message) => {
            this._snackBar.open(
                message.message,
                message.action,
                message.config,
            );
        });

        this.store.dispatch(new SystemActions.LoadSystemInfo());
    }

    toggleSidenav() {
        this.sideNav?.toggle();
    }

    setInfoVisibility(visible: boolean) {
        this.store.dispatch(new UiActions.ChangeIsInfoFullyVisible(visible));
    }
}
