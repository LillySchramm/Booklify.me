import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BookDto } from 'src/app/api';

@Component({
    selector: 'app-book-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './book-card.component.html',
    styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent {
    @Input() book!: BookDto;

    constructor() {}
}
