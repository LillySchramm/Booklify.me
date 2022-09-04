import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { BooksDisplayModule } from 'src/app/components/books-display/books-display.module';

@NgModule({
    declarations: [HomePageComponent],
    imports: [CommonModule, BooksDisplayModule],
})
export class HomePageModule {}
