import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { makeFirstLetterLowercase } from '@shared/utils';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private toast: ToastrService,
    private router: Router
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      // TODO: Better Error handling.
      // https://medium.com/@aleixsuau/error-handling-angular-859d529fa53a
      catchError((error: Error | HttpErrorResponse): Observable<never> => {
        if (error instanceof HttpErrorResponse) {
          const { status } = error;

          switch (status) {
            case HttpStatusCode.BadRequest:
              if (error.error?.errors) {
                const { errors } = error.error; // { fieldKey: errorMessage }
                const modalStateErrors: { [ key: string ]: string[] }[] = [];
                for (const err in errors) {
                  if (errors.hasOwnProperty(err)) {
                    modalStateErrors.push({
                      [ makeFirstLetterLowercase(err) ]: errors[ err ]
                    });
                  }
                }
                return throwError(() => modalStateErrors);
              }
              this.toast.error(error.error);
              return throwError(() => error.error);

            case HttpStatusCode.NotFound:
              this.toast.warning('Not found!', 'Item does not exist!');
              return throwError(() => error);

            case HttpStatusCode.Unauthorized:
              this.toast.error('You are not authorized!');
              return throwError(() => error);

            case HttpStatusCode.InternalServerError:
              const navigationExtras: NavigationExtras = { state: { error: error.error } };
              this.router.navigateByUrl('errors/server', navigationExtras);
              return throwError(() => error);

            default:
              this.toast.error('Something unexpected went wrong!');
              console.log(error);
              break;
          }

        }
        return throwError(() => error);

        // if (error instanceof HttpErrorResponse) {
        //   if (error.status === 0) {
        //     if (error?.statusText === 'Unknown Error') {
        //       return throwError('Server is not responding!');
        //     }
        //     this.store.dispatch(logout());
        //     return throwError(error.statusText);
        //   } else if (error.status === 401) {
        //     if (error.statusText === 'Unauthorized') {
        //       this.store.dispatch(logout());
        //       return throwError('You are not authorized!');
        //     }
        //     return throwError(error.statusText);
        //   }
        //   // HttpStatusCode of InternalServerError is 500
        //   if (error.status === 500) {
        //     return throwError(error.error);
        //   }

        //   const applicationError = error.headers.get('Application-Error');
        //   if (applicationError) {
        //     return throwError(applicationError);
        //   }

        //   const serverError = error.error;
        //   let modelStateErrors = '';
        //   if (typeof serverError?.errors === 'object') {
        //     for (const key in serverError.errors) {
        //       if (serverError.errors[key]) {
        //         modelStateErrors += serverError.errors[key] + '\n';
        //       }
        //     }
        //   }
        //   return throwError(modelStateErrors || serverError || 'Server Error');
        // } else {
        //   return throwError('Unknown Error!!!');
        // }
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
