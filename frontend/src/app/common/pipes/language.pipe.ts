import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'language',
    standalone: true,
})
export class LanguagePipe implements PipeTransform {
    transform(value: string): string {
        const languageNames = new Intl.DisplayNames(['en'], {
            type: 'language',
        });

        return languageNames.of(value) || value;
    }
}
