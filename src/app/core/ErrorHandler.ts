import { ErrorHandler } from '@angular/core';

export class MyErrorHandler implements ErrorHandler {

  handleError(error: any) {
    console.error(error);
  }

}
