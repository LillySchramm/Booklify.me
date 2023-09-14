import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';
import { FormErrorPipe } from 'src/app/common/pipes/form-error.pipe';
import { AddBookDialogComponent } from 'src/app/pages/home/add-book-dialog/add-book-dialog.component';

@Component({
    selector: 'app-collection',
    standalone: true,
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatDividerModule,
        TranslocoModule,
        FormErrorPipe,
        MatIconModule,
        MatDialogModule,
        AddBookDialogComponent,
    ],
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent {
    public form = new FormGroup({
        searchText: new FormControl({ value: '', disabled: true }),
    });

    constructor(private dialog: MatDialog) {}

    openAddBookDialog() {
        this.dialog.open(AddBookDialogComponent);
    }
}
