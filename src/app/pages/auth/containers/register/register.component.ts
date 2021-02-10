import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Register } from '@auth/models';

import { AuthState, selectRegisterPageState } from '@auth/store/reducers';
import { clearRegisterError, register } from '@auth/store/actions/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnDestroy {

  vm$ = this.store.select(selectRegisterPageState);

  constructor(private store: Store<AuthState>) { }

  clearErrors(): void {
    this.store.dispatch(clearRegisterError());
  }

  onRegister(credentials: Register): void {
    this.store.dispatch(register({ credentials }));
  }

  ngOnDestroy(): void {
    this.clearErrors();
  }


}
