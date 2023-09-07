import { Injectable } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

export interface SnackBarMessage {
    message: string;
    action?: string | undefined;
    config?: MatSnackBarConfig<any> | undefined;
}

@Injectable({
    providedIn: 'root',
})
export class SnackBarService {
    constructor() {}

    public message$ = new Subject<SnackBarMessage>();

    public show(
        message: string,
        action: string | undefined = 'OK',
        config: MatSnackBarConfig<any> | undefined = {},
    ): void {
        this.message$.next({ message, action, config });
    }
}
