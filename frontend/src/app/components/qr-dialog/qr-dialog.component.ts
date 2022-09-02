import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import * as qr from 'qrcode';

@Component({
    selector: 'app-qr-dialog',
    templateUrl: './qr-dialog.component.html',
    styleUrls: ['./qr-dialog.component.scss'],
})
export class QrDialogComponent implements OnChanges {
    @Input() data: string = '';
    dataUrl = '';

    constructor() {}
    async ngOnChanges(changes: SimpleChanges): Promise<void> {
        if (!this.data) {
            return;
        }
        this.dataUrl = await qr.toDataURL(this.data, {
            errorCorrectionLevel: 'L',
            margin: 1,
            type: 'image/jpeg',
            rendererOpts: { quality: 1 },
        });
    }
}
