import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { first, switchMap } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { AuthState, selectAuthToken } from '@auth/store/reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<AuthState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(selectAuthToken).pipe(
      first(),
      switchMap(token => {
        const authRequest = !!token
          ? req.clone({ setHeaders: { Authorization: `Bearer ${ token }` } })
          : req;
        return next.handle(authRequest);
      })
    );
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};
