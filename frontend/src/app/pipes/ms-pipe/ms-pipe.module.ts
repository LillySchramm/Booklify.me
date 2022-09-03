import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsPipe } from './ms.pipe';

@NgModule({
    declarations: [MsPipe],
    imports: [CommonModule],
    exports: [MsPipe],
})
export class MsPipeModule {}
