import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnapshotPageComponent } from './snapshot-page.component';
import { BookGroupModule } from 'src/app/components/book-group/book-group.module';
import { CardModule } from 'primeng/card';

@NgModule({
    declarations: [SnapshotPageComponent],
    imports: [CommonModule, BookGroupModule, CardModule],
})
export class SnapshotPageModule {}
