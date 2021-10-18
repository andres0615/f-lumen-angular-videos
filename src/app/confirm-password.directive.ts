import { Directive } from '@angular/core';
import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appConfirmPassword]',
})
export class ConfirmPasswordDirective {
  constructor() {}
}

/*export function isEqualValidator(value: FormControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    //const forbidden = nameRe.test(control.value);
    console.log(value.value);
    const isEqual: boolean = (control.value != value);
    return (isEqual == true) ? {isEqual: {value: control.value}} : null;
  };
}*/

export function matchPassword(password: string, confirmPassword: string) {
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.controls[password];
    const confirmPasswordControl = formGroup.controls[confirmPassword];

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (
      confirmPasswordControl.errors &&
      !confirmPasswordControl.errors.passwordMismatch
    ) {
      return null;
    }

    console.log(passwordControl.value);
    console.log(confirmPasswordControl.value);

    if (passwordControl.value !== confirmPasswordControl.value) {
      passwordControl.setErrors({ passwordMismatch: true });
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      passwordControl.setErrors(null);
      confirmPasswordControl.setErrors(null);
    }

    return null;
  };
}
