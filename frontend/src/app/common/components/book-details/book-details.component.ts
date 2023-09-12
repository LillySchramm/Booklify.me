import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-book-details',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.scss'],
})
export class BookDetailsComponent {}
