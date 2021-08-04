import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthToken } from '@store/auth';
import { RootState } from '@store/reducers';
import { Observable } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<RootState>) { }

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
