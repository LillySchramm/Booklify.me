import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { License } from '../../services/licenses.service';
import { LicenseDialogComponent } from '../license-dialog/license-dialog.component';

@Component({
    selector: 'app-license-item',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatIconModule, TranslocoModule],
    templateUrl: './license-item.component.html',
    styleUrl: './license-item.component.scss',
})
export class LicenseItemComponent {
    @Input() license!: License;

    constructor(private readonly dialog: MatDialog) {}

    openText() {
        this.dialog.open(LicenseDialogComponent, {
            data: this.license,
        });
    }
}
