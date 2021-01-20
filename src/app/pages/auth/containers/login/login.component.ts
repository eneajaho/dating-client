import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Credentials } from '@auth/models';

import * as fromAuth from '@auth/store/reducers';
import { LoginPageActions } from '@auth/store/actions';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  styles: [` h2 { color: var(--text-color)  } `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy {

  vm$ = this.store.select(fromAuth.selectLoginPageState);

  constructor(private store: Store<fromAuth.State>) { }

  clearErrors(): void {
    this.store.dispatch(LoginPageActions.clearLoginError());
  }

  handleLogin(credentials: Credentials): void {
    this.store.dispatch(LoginPageActions.login({ credentials }));
  }

  ngOnDestroy(): void {
    this.clearErrors();
  }

}
