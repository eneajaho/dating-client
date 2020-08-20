import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Credentials } from "@auth/models";

import * as fromAuth from '@auth/store/reducers';
import { LoginPageActions } from "@auth/store/actions";

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  error$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromAuth.State>) { }

  ngOnInit() {
    this.store.dispatch(LoginPageActions.clearLoginError());
    this.error$ = this.store.select(fromAuth.selectLoginPageError);
    this.loading$ = this.store.select(fromAuth.selectLoginPagePending);
  }

  handleLogin(credentials: Credentials) {
    this.store.dispatch(LoginPageActions.login({ credentials }));
  }

}
