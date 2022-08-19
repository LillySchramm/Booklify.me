import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsbnPipe } from './isbn.pipe';

@NgModule({
    declarations: [IsbnPipe],
    imports: [CommonModule],
    exports: [IsbnPipe],
})
export class IsbnPipeModule {}
