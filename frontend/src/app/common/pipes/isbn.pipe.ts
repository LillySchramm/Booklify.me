import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'isbn',
    standalone: true,
})
export class IsbnPipe implements PipeTransform {
    transform(value: string): string {
        if (value.length === 13) {
            const block1 = value.substring(0, 3);
            const block2 = value.substring(3, 4);
            const block3 = value.substring(4, 9);
            const block4 = value.substring(9, 12);
            const block5 = value.substring(12, 13);
            return `${block1}-${block2}-${block3}-${block4}-${block5}`;
        }

        if (value.length === 10) {
            const block1 = value.substring(0, 1);
            const block2 = value.substring(1, 6);
            const block3 = value.substring(6, 9);
            const block4 = value.substring(9, 10);
            return `${block1}-${block2}-${block3}-${block4}`;
        }

        return value;
    }
}
