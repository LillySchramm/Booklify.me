import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksDisplayComponent } from './books-display.component';
import { BookGroupModule } from '../book-group/book-group.module';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
    declarations: [BooksDisplayComponent],
    imports: [CommonModule, BookGroupModule, InputSwitchModule],
    exports: [BooksDisplayComponent],
})
export class BooksDisplayModule {}
