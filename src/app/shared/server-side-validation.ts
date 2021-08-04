import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

export function handleServerSideValidation(error: HttpErrorResponse,  form: FormGroup): undefined | string {
  // if the error isn't with status 422 (Unprocessable Entity) don't do anything
  if (error.status !== 422) {
    return undefined;
  }

  const unhandledErrors: any[] = [];
  const validationError = error.error?.errors;

  Object.keys(validationError || {}).forEach(element => {
    const formControl = form.get(element);

    if (formControl) {
      formControl.setErrors({ serverSideError: validationError[element].join('') });
    } else {
      // Field is not defined in form but there is a validation error for it, set it globally
      unhandledErrors.push(validationError[element].join(''));
    }
  });

  if (unhandledErrors.length) {
    return unhandledErrors.join();
  }

  return undefined;
}
