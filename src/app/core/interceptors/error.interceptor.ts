import { Injectable } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { Store } from "@ngrx/store";

import * as fromAuth from '@auth/store/reducers';
import { AuthActions } from "@auth/store/actions";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromAuth.State>) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // TODO: Better Error handling.
      // Check: https://medium.com/@aleixsuau/error-handling-angular-859d529fa53a
      catchError((error: any): Observable<never> => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            if (error?.statusText === "Unknown Error") {
              return throwError("Server is not responding!");
            }
            this.store.dispatch(AuthActions.logout());
            return throwError(error.statusText);
          } else if (error.status === 401) {
            if (error.statusText === "Unauthorized") {
              this.store.dispatch(AuthActions.logout());
              return throwError("You are not authorized!");
            }
            return throwError(error.statusText);
          }
          // HttpStatusCode of InternalServerError is 500
          if (error.status === 500) {
            return throwError(error.error);
          }

          const applicationError = error.headers.get('Application-Error');
          if (applicationError) {
            return throwError(applicationError);
          }

          const serverError = error.error;
          let modelStateErrors = '';
          if (typeof serverError?.errors === 'object') {
            for (const key in serverError.errors) {
              if (serverError.errors[key])
                modelStateErrors += serverError.errors[key] + '\n';
            }
          }
          return throwError(modelStateErrors || serverError || 'Server Error');
        } else {
          return throwError('Unknown Error!!!');
        }
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
}
