import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookGroupComponent } from './book-group.component';
import { BookItemModule } from '../book-item/book-item.module';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
    declarations: [BookGroupComponent],
    imports: [CommonModule, BookItemModule, AccordionModule],
    exports: [BookGroupComponent],
})
export class BookGroupModule {}
