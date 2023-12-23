import { Component } from '@angular/core';
import * as JsBarcode from 'jsbarcode';

@Component({
    selector: 'app-isbn-debug',
    standalone: true,
    imports: [],
    templateUrl: './isbn-debug.component.html',
    styleUrl: './isbn-debug.component.scss',
})
export class IsbnDebugComponent {
    isbns: string[] = [
        '9783551753083',
        '9783964336217',
        '9781646511464',
        '9781638586593',
        '9781646091799',
        '9783770499908',
        '9782889510801',
        '9781648273315',
        '9783770494231',
        '9781646511150',
        '9781648278846',
        '9783551793737',
        '9781646511471',
        '9782889514519',
        '9783462046335',
    ];

    constructor() {}

    generateIsbn(isbn: string): string {
        const canvas = document.createElement('canvas');
        const options: JsBarcode.Ean13Options = {
            format: 'EAN13',
            margin: 10,
            displayValue: true,
            fontSize: 20,
            textMargin: 10,
        };
        JsBarcode(canvas, isbn, options);

        return canvas.toDataURL('image/png');
    }
}
