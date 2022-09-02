import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrDialogComponent } from './qr-dialog.component';

@NgModule({
    declarations: [QrDialogComponent],
    imports: [CommonModule],
    exports: [QrDialogComponent],
})
export class QrDialogModule {}
