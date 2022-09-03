import { Pipe, PipeTransform } from '@angular/core';
import prettyMilliseconds from 'pretty-ms';

@Pipe({
    name: 'ms',
})
export class MsPipe implements PipeTransform {
    transform(value: number, ...args: unknown[]): unknown {
        return prettyMilliseconds(value);
    }
}
