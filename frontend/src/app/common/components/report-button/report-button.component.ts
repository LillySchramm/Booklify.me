import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Select } from '@ngxs/store';
import { Observable, combineLatest, map } from 'rxjs';
import { UserDto } from 'src/app/api';
import { SystemState } from 'src/app/state/system/system.state';
import { UiState } from 'src/app/state/ui/ui.state';
import { UserState } from 'src/app/state/user/user.state';
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';

@Component({
    selector: 'app-report-button',
    standalone: true,
    imports: [MatIconModule, MatDialogModule, MatButtonModule],
    templateUrl: './report-button.component.html',
    styleUrl: './report-button.component.scss',
})
export class ReportButtonComponent {
    @Select(UserState.currentUser) currentUser$!: Observable<
        UserDto | undefined
    >;
    $currentUser = toSignal(this.currentUser$);

    @Select(UiState.reportId) reportId$!: Observable<string | undefined>;
    $reportId = toSignal(this.reportId$);

    @Select(SystemState.reportEnabled) reportEnabled$!: Observable<boolean>;
    $reportEnabled = toSignal(this.reportEnabled$);

    showReportButton$ = combineLatest([
        this.currentUser$,
        this.reportId$,
        this.reportEnabled$,
    ]).pipe(
        map(([currentUser, reportId, reportEnabled]) => {
            return (
                !!currentUser &&
                currentUser?.id !== reportId &&
                reportId !== undefined &&
                reportEnabled
            );
        }),
    );
    $showReportButton = toSignal(this.showReportButton$);

    constructor(private dialog: MatDialog) {}

    openDialog() {
        this.dialog.open(ReportDialogComponent, {
            data: this.$reportId(),
        });
    }
}
