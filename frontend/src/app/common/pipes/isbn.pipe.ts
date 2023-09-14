import { Pipe, PipeTransform } from '@angular/core';
import { hyphenate } from 'isbn3';

@Pipe({
    name: 'isbn',
    standalone: true,
})
export class IsbnPipe implements PipeTransform {
    transform(value: string): string {
        return hyphenate(value);
    }
}
