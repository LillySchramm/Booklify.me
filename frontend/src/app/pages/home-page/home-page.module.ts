import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { BookGroupModule } from 'src/app/components/book-group/book-group.module';

@NgModule({
    declarations: [HomePageComponent],
    imports: [CommonModule, BookGroupModule],
})
export class HomePageModule {}
