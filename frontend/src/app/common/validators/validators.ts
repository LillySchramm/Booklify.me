/*
Please don't kill me for this, I know this is not the best way to do this, but I was to lazy to write smart validators
*/

import {
    AbstractControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';
import { parse } from 'isbn3';

function usernameMinLengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }

        return control.value.length < 3
            ? { usernameMinLength: { value: control.value } }
            : null;
    };
}

function usernameMaxLengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }

        return control.value.length > 25
            ? { usernameMaxLength: { value: control.value } }
            : null;
    };
}

function usernameRegexValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }

        const regex = /^([a-zA-Z\._\-0-9])*$/;
        return !regex.test(control.value)
            ? { usernameRegex: { value: control.value } }
            : null;
    };
}

function passwordMinLengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }

        return control.value.length < 8
            ? { passwordMinLength: { value: control.value } }
            : null;
    };
}

function passwordContainsLowercaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }

        const regex = /[a-z]/;
        return !regex.test(control.value)
            ? { passwordContainsLowercase: { value: control.value } }
            : null;
    };
}

function passwordContainsUppercaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }

        const regex = /[A-Z]/;
        return !regex.test(control.value)
            ? { passwordContainsUppercase: { value: control.value } }
            : null;
    };
}

function passwordContainsNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }

        const regex = /[0-9]/;
        return !regex.test(control.value)
            ? { passwordContainsNumber: { value: control.value } }
            : null;
    };
}

function passwordContainsSpecialCharacterValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }

        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        return !regex.test(control.value)
            ? { passwordContainsSpecialCharacter: { value: control.value } }
            : null;
    };
}

function isbnValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
            return null;
        }

        const parsed = parse(control.value);

        return parsed === null || !parsed.isValid
            ? { isbn: { value: control.value } }
            : null;
    };
}

function passwordsNotEqualValidator(form: () => FormGroup): ValidatorFn {
    return (): ValidationErrors | null => {
        const password1Field = form().get('password1');
        const password2Field = form().get('password2');

        if (!password1Field || !password2Field) {
            return null;
        }

        const password1 = password1Field.value;
        const password2 = password2Field.value;

        return password1 !== password2
            ? { passwordsNotEqual: { value: true } }
            : null;
    };
}

export class CustomValidators {
    static usernameMinLengthValidator = usernameMinLengthValidator;
    static usernameMaxLengthValidator = usernameMaxLengthValidator;
    static usernameRegexValidator = usernameRegexValidator;

    static passwordMinLengthValidator = passwordMinLengthValidator;
    static passwordContainsLowercaseValidator =
        passwordContainsLowercaseValidator;
    static passwordContainsUppercaseValidator =
        passwordContainsUppercaseValidator;
    static passwordContainsNumberValidator = passwordContainsNumberValidator;
    static passwordContainsSpecialCharacterValidator =
        passwordContainsSpecialCharacterValidator;
    static passwordsNotEqualValidator = passwordsNotEqualValidator;

    static isbnValidator = isbnValidator;
}
