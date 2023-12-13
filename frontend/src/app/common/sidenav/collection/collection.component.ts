import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserDto } from 'src/app/api';
import { FormErrorPipe } from 'src/app/common/pipes/form-error.pipe';
import { AddBookDialogComponent } from 'src/app/pages/home/add-book-dialog/add-book-dialog.component';
import { BooksState } from 'src/app/state/books/books.state';
import { UserState } from 'src/app/state/user/user.state';

@Component({
    selector: 'app-collection',
    standalone: true,
    imports: [
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
    @Select(UserState.currentUser) currentUser$!: Observable<
        UserDto | undefined
    >;
    $currentUser = toSignal(this.currentUser$);

    @Select(BooksState.currentOwnerId) currentOwnerId$!: Observable<
        string | undefined
    >;
    $currentOwnerId = toSignal(this.currentOwnerId$);

    public form = new FormGroup({
        searchText: new FormControl({ value: '', disabled: true }),
    });

    constructor(private dialog: MatDialog) {}

    openAddBookDialog() {
        this.dialog.open(AddBookDialogComponent);
    }
}
