import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnapshotManagePageComponent } from './snapshot-manage-page.component';
import { MsPipeModule } from 'src/app/pipes/ms-pipe/ms-pipe.module';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [SnapshotManagePageComponent],
    imports: [
        CommonModule,
        MsPipeModule,
        TableModule,
        InputNumberModule,
        InputTextModule,
        ButtonModule,
        DropdownModule,
        FormsModule,
    ],
})
export class SnapshotManagePageModule {}
