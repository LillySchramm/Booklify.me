import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SnackBarService } from './common/services/snack-bar.service';
import { TokenService } from './common/services/token.service';
import { UiState } from './state/ui/ui.state';

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

    constructor(
        private snackBar: SnackBarService,
        private _snackBar: MatSnackBar,
        private _token: TokenService,
    ) {
        this.snackBar.message$.subscribe((message) => {
            this._snackBar.open(
                message.message,
                message.action,
                message.config,
            );
        });
    }
}
