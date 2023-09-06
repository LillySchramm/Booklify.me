/*
Please don't kill me for this, I know this is not the best way to do this, but I was to lazy to write smart validators
*/

import {
    AbstractControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
} from '@angular/forms';

function usernameMinLengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value.length < 3
            ? { usernameMinLength: { value: control.value } }
            : null;
    };
}

function usernameMaxLengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value.length > 25
            ? { usernameMaxLength: { value: control.value } }
            : null;
    };
}

function usernameRegexValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const regex = /^([a-zA-Z\._\-0-9])*$/;
        return !regex.test(control.value)
            ? { usernameRegex: { value: control.value } }
            : null;
    };
}

function passwordMinLengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        return control.value.length < 8
            ? { passwordMinLength: { value: control.value } }
            : null;
    };
}

function passwordContainsLowercaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const regex = /[a-z]/;
        return !regex.test(control.value)
            ? { passwordContainsLowercase: { value: control.value } }
            : null;
    };
}

function passwordContainsUppercaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const regex = /[A-Z]/;
        return !regex.test(control.value)
            ? { passwordContainsUppercase: { value: control.value } }
            : null;
    };
}

function passwordContainsNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const regex = /[0-9]/;
        return !regex.test(control.value)
            ? { passwordContainsNumber: { value: control.value } }
            : null;
    };
}

function passwordContainsSpecialCharacterValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
        return !regex.test(control.value)
            ? { passwordContainsSpecialCharacter: { value: control.value } }
            : null;
    };
}

function passwordsNotEqualValidator(form: () => FormGroup): ValidatorFn {
    return (): ValidationErrors | null => {
        const password1 = form().get('password1')?.value;
        const password2 = form().get('password2')?.value;

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
}
