import { AbstractControl, ValidationErrors } from '@angular/forms';

export default class Valid {
  static specialContains(control: AbstractControl): ValidationErrors | null {
    return control.value && !control.value.match(/[#?!@_$%^&*-]/)
      ? { specialChar: true }
      : null;
  }
  static upperCase(control: AbstractControl): ValidationErrors | null {
    return control.value && !control.value.match(/[A-Z]/)
      ? { upperCase: true }
      : null;
  }
  static lowerCase(control: AbstractControl): ValidationErrors | null {
    return control.value && !control.value.match(/[a-z]/)
      ? { lowerCase: true }
      : null;
  }
  static numberCase(control: AbstractControl): ValidationErrors | null {
    return control.value && !control.value.match(/\d+/)
      ? { numberCase: true }
      : null;
  }
  static minChar(control: AbstractControl): ValidationErrors | null {
    return control.value && !control.value.match(/.{8}/)
      ? { minChar: true }
      : null;
  }
  static dobValidate(control: AbstractControl): ValidationErrors | null {
    if (control.value) {
      let currentDate: any = new Date().toDateString();
      let splitArr = currentDate.split(' ')[3];
      let selectedDate: any = control.value;
      let splitArrDate = selectedDate.split('-')[0];
      let difference = splitArr - splitArrDate;
      return difference < 18 ? { dobValidate: true } : null;
    }
  }
}
