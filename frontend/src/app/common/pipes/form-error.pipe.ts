import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
    name: 'formError',
    standalone: true,
})
export class FormErrorPipe implements PipeTransform {
    constructor(private transloco: TranslocoService) {}

    transform(value: ValidationErrors | null | undefined): string {
        if (!value || value === null) {
            return '';
        }

        if (value['required']) {
            return this.transloco.translate('form-errors.required');
        }

        if (value['email']) {
            return this.transloco.translate('form-errors.email');
        }

        if (value['usernameMinLength']) {
            return this.transloco.translate('form-errors.usernameMinLength');
        }

        if (value['usernameMaxLength']) {
            return this.transloco.translate('form-errors.usernameMaxLength');
        }

        if (value['usernameRegex']) {
            return this.transloco.translate('form-errors.usernameRegex');
        }

        if (value['passwordMinLength']) {
            return this.transloco.translate('form-errors.passwordMinLength');
        }

        if (value['passwordsNotEqual']) {
            return this.transloco.translate('form-errors.passwordsNotEqual');
        }

        if (value['passwordContainsLowercase']) {
            return this.transloco.translate(
                'form-errors.passwordContainsLowercase',
            );
        }

        if (value['passwordContainsUppercase']) {
            return this.transloco.translate(
                'form-errors.passwordContainsUppercase',
            );
        }

        if (value['passwordContainsNumber']) {
            return this.transloco.translate(
                'form-errors.passwordContainsNumber',
            );
        }

        if (value['passwordContainsSpecialCharacter']) {
            return this.transloco.translate(
                'form-errors.passwordContainsSpecialCharacter',
            );
        }

        return '';
    }
}
