import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Author, Book, Publisher } from 'src/app/api';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-book-item',
    templateUrl: './book-item.component.html',
    styleUrls: ['./book-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BookItemComponent implements OnInit {
    @Input() book!: Book & { authors: Author[]; publisher: Publisher | null };
    public baseUrl = environment.API_BASE_PATH;

    constructor() {}

    ngOnInit(): void {}
}
