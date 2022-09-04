import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page.component';
import { BookGroupModule } from 'src/app/components/book-group/book-group.module';
import { PageHeaderModule } from 'src/app/components/page-header/page-header.module';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
    declarations: [HomePageComponent],
    imports: [
        CommonModule,
        BookGroupModule,
        PageHeaderModule,
        InputSwitchModule,
    ],
})
export class HomePageModule {}
