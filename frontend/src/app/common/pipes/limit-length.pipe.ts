import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'limitLength',
    standalone: true,
})
export class LimitLengthPipe implements PipeTransform {
    transform(value: string, length: number): unknown {
        return value.length > length
            ? value.substring(0, length) + '...'
            : value;
    }
}
