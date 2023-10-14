import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
    selector: 'app-delete-account-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDialogModule,
        TranslocoModule,
        MatCheckboxModule,
    ],
    templateUrl: './delete-account-dialog.component.html',
    styleUrls: ['./delete-account-dialog.component.scss'],
})
export class DeleteAccountDialogComponent {
    public form = new FormGroup({
        confirm: new FormControl(false, [Validators.requiredTrue]),
    });
}
