import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Store } from "@ngrx/store";
import { first, switchMap } from "rxjs/operators";

import * as fromAuth from '@auth/store/reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromAuth.State>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select(fromAuth.selectUser).pipe(
      first(),
      switchMap(user => {
        const authRequest = !!user ? req.clone({
          setHeaders: { Authorization: `Bearer ${ user.token }` }
        }) : req;
        return next.handle(authRequest);
      })
    );
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}
