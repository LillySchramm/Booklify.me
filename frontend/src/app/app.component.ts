import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from './common/services/snack-bar.service';
import { TokenService } from './common/services/token.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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
