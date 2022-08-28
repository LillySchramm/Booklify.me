import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'language',
})
export class LanguagePipe implements PipeTransform {
    transform(value: string, ...args: unknown[]): unknown {
        const languages = new Intl.DisplayNames(['en'], {
            type: 'language',
        });

        return languages.of(value) || value;
    }
}
