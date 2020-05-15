import { FormGroup, ValidatorFn, ValidationErrors } from "@angular/forms";

export const passwordValidation: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password.value !== confirmPassword.value ? { 'passwordsDontMatch': true } : null;
};
