import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarService } from './common/services/snack-bar.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    constructor(
        private snackBar: SnackBarService,
        private _snackBar: MatSnackBar,
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
