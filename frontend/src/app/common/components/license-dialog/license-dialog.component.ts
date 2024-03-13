import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
} from '@angular/material/dialog';
import { TranslocoModule } from '@ngneat/transloco';
import { License } from '../../services/licenses.service';

@Component({
    selector: 'app-license-dialog',
    standalone: true,
    imports: [
        MatButtonModule,
        MatDialogActions,
        MatDialogClose,
        MatDialogTitle,
        MatDialogContent,
        TranslocoModule,
    ],
    templateUrl: './license-dialog.component.html',
    styleUrl: './license-dialog.component.scss',
})
export class LicenseDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: License) {}
}
