import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AsyncPipe } from '@angular/common';
import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatAutocompleteModule,
    MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject, map, startWith } from 'rxjs';

@Component({
    selector: 'app-chip-filter',
    standalone: true,
    imports: [
        FormsModule,
        MatFormFieldModule,
        MatChipsModule,
        MatIconModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        AsyncPipe,
    ],
    templateUrl: './chip-filter.component.html',
    styleUrl: './chip-filter.component.scss',
})
export class ChipFilterComponent {
    private _items: string[] = [];
    @Input() set items(value: string[]) {
        this._items = value;
        if (!value) {
            return;
        }

        this.filteredItems$.next(
            value.filter((item) => !this.selectedItems.includes(item)),
        );
    }

    get items(): string[] {
        return this._items;
    }

    @Input() label = 'Filter';
    @Input() placeholder = 'Filter';

    @Output() itemsChange = new EventEmitter<string[]>();

    separatorKeysCodes: number[] = [ENTER, COMMA];
    fieldControl = new FormControl('');
    filteredItems$: BehaviorSubject<string[]> = new BehaviorSubject(
        [] as string[],
    );
    selectedItems: string[] = [];

    @ViewChild('input') itemInput!: ElementRef<HTMLInputElement>;

    constructor() {
        this.fieldControl.valueChanges
            .pipe(
                startWith(null),
                map((item: string | null) => this._filter(item)),
            )
            .subscribe((value) => this.filteredItems$.next(value));
    }

    add(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();

        if (
            !value ||
            !this.items.includes(value) ||
            this.selectedItems.includes(value)
        ) {
            return;
        }

        this.selectedItems.push(value);
        this.itemsChange.emit(this.selectedItems);

        event.chipInput!.clear();

        this.fieldControl.setValue(null);
    }

    remove(item: string): void {
        const index = this.selectedItems.indexOf(item);

        if (index >= 0) {
            this.selectedItems.splice(index, 1);
            this.itemsChange.emit(this.selectedItems);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        if (this.selectedItems.includes(event.option.viewValue)) {
            return;
        }
        this.selectedItems.push(event.option.viewValue);
        this.itemsChange.emit(this.selectedItems);
        this.itemInput.nativeElement.value = '';
        this.fieldControl.setValue(null);
    }

    private _filter(value: string | null): string[] {
        const withoutUsed = this.items.filter(
            (item) => !this.selectedItems.includes(item),
        );
        if (!value) {
            return withoutUsed;
        }

        const filterValue = value.toLowerCase();

        return withoutUsed.filter((item) =>
            item.toLowerCase().includes(filterValue),
        );
    }
}
