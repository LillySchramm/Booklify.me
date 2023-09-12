import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { TranslocoModule } from '@ngneat/transloco';
import { BookDto } from 'src/app/api';
import { NoImagePlaceholderComponent } from 'src/app/common/components/no-image-placeholder/no-image-placeholder.component';
import { CoverService } from 'src/app/common/services/cover.service';

@Component({
    selector: 'app-book-card',
    standalone: true,
    imports: [
        CommonModule,
        MatDividerModule,
        NoImagePlaceholderComponent,
        TranslocoModule,
    ],
    templateUrl: './book-card.component.html',
    styleUrls: ['./book-card.component.scss'],
})
export class BookCardComponent implements OnInit {
    @Input() book!: BookDto;
    coverUrl?: string | null = '';

    constructor(private cover: CoverService) {}

    ngOnInit(): void {
        if (this.book.bookCoverId) {
            this.coverUrl = this.cover.getCoverUrl(this.book.bookCoverId);
        } else this.coverUrl = null;
    }
}
