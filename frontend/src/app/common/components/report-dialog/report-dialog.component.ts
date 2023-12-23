import { Component, Inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialogModule,
    MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ReportActions } from 'src/app/state/reports/reports.actions';
import { ReportState } from 'src/app/state/reports/reports.state';
import { FormErrorPipe } from '../../pipes/form-error.pipe';

@UntilDestroy()
@Component({
    selector: 'app-report-dialog',
    standalone: true,
    imports: [
        MatDialogModule,
        TranslocoModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormErrorPipe,
        MatProgressBarModule,
        MatButtonModule,
        MatSelectModule,
    ],
    templateUrl: './report-dialog.component.html',
    styleUrl: './report-dialog.component.scss',
})
export class ReportDialogComponent {
    @Select(ReportState.isLoading) isLoading$!: Observable<boolean>;
    $isLoading = toSignal(this.isLoading$);

    @Select(ReportState.reportDone) reportDone$!: Observable<number>;
    $reportDone = toSignal(this.reportDone$);

    categories = ['USERNAME', 'OTHER'];

    private lastDone = this.$reportDone();

    public form = new FormGroup({
        category: new FormControl('', [Validators.required]),
        comment: new FormControl('', [Validators.required]),
    });

    constructor(
        private readonly store: Store,
        @Inject(MAT_DIALOG_DATA) public targetId: string,
        private dialogRef: MatDialogRef<ReportDialogComponent>,
    ) {
        this.reportDone$.pipe(untilDestroyed(this)).subscribe((done) => {
            if (done !== this.lastDone) {
                this.dialogRef.close();
            }
        });
    }

    report() {
        if (this.form.invalid) {
            return;
        }

        this.store.dispatch(
            new ReportActions.ReportUser({
                alternateCategory: '',
                category: this.form.value.category!,
                message: this.form.value.comment!,
                targetId: this.targetId,
            }),
        );
    }
}
