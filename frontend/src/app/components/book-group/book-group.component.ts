import { Component, Input, OnInit } from '@angular/core';
import { Author, Book, Publisher } from 'src/app/api';

@Component({
    selector: 'app-book-group',
    templateUrl: './book-group.component.html',
    styleUrls: ['./book-group.component.scss'],
})
export class BookGroupComponent implements OnInit {
    @Input() books!: (Book & {
        authors: Author[];
        publisher: Publisher | null;
    })[];
    @Input() name: string = '';

    constructor() {}

    ngOnInit(): void {}
}
