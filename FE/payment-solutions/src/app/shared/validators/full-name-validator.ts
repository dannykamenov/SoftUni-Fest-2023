import { AbstractControl, ValidatorFn } from '@angular/forms';

export function fullNameValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!control.value) {
      return null; 
    }
    const nameParts = control.value.trim().split(' ');
    if (nameParts.length < 2) {
      return { 'fullNameRequired': true };
    }
    return null;
  };
}