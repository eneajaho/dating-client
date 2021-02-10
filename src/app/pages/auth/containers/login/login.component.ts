import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Credentials } from '@auth/models';

import { AuthState, selectLoginPageState } from '@auth/store/reducers';
import { clearLoginError, login } from '@auth/store/actions/auth.actions';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy {

  vm$ = this.store.select(selectLoginPageState);

  constructor(private store: Store<AuthState>) { }

  clearErrors(): void {
    this.store.dispatch(clearLoginError());
  }

  onLogin(credentials: Credentials): void {
    this.store.dispatch(login({ credentials }));
  }

  ngOnDestroy(): void {
    this.clearErrors();
  }

}
