import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalDevicesPageComponent } from './external-devices-page.component';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { QrDialogModule } from 'src/app/components/qr-dialog/qr-dialog.module';
import { InputTextModule } from 'primeng/inputtext';
@NgModule({
    declarations: [ExternalDevicesPageComponent],
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        DialogModule,
        QrDialogModule,
        InputTextModule,
    ],
    exports: [ExternalDevicesPageComponent],
})
export class ExternalDevicesPageModule {}
