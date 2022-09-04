import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnapshotPageComponent } from './snapshot-page.component';
import { CardModule } from 'primeng/card';
import { BooksDisplayModule } from 'src/app/components/books-display/books-display.module';

@NgModule({
    declarations: [SnapshotPageComponent],
    imports: [CommonModule, BooksDisplayModule, CardModule],
})
export class SnapshotPageModule {}
