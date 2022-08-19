import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookItemComponent } from './book-item.component';
import { CardModule } from 'primeng/card';
import { IsbnPipeModule } from 'src/app/pipes/isbn-pipe/isbn-pipe.module';

@NgModule({
    declarations: [BookItemComponent],
    imports: [CommonModule, CardModule, IsbnPipeModule],
    exports: [BookItemComponent],
})
export class BookItemModule {}
