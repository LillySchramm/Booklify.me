import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './page-header.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

@NgModule({
    declarations: [PageHeaderComponent],
    imports: [CommonModule, MenubarModule, ButtonModule],
    exports: [PageHeaderComponent],
})
export class PageHeaderModule {}
