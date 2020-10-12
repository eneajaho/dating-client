import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Credentials } from "@auth/models";

import * as fromAuth from '@auth/store/reducers';
import { LoginPageActions } from "@auth/store/actions";

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styles: [` h2 { color: var(--text-color)  }  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit, OnDestroy {

  error$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromAuth.State>) { }

  ngOnInit() {
    this.error$ = this.store.select(fromAuth.selectLoginPageError);
    this.loading$ = this.store.select(fromAuth.selectLoginPagePending);
  }

  clearErrors() {
    this.store.dispatch(LoginPageActions.clearLoginError());
  }

  handleLogin(credentials: Credentials) {
    this.store.dispatch(LoginPageActions.login({ credentials }));
  }

  ngOnDestroy(): void {
    this.clearErrors();
  }

}
