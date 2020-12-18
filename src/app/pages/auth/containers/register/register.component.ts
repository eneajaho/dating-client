import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Store } from "@ngrx/store";
import { Register } from "@auth/models";

import * as fromAuth from '@auth/store/reducers';
import { RegisterPageActions } from "@auth/store/actions";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [` h3, p { color: var(--text-color)  } `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnDestroy {

  vm$ = this.store.select(fromAuth.selectRegisterPageState);

  constructor(private store: Store<fromAuth.State>) { }

  clearErrors(): void {
    this.store.dispatch(RegisterPageActions.clearRegisterError());
  }

  handleRegister(credentials: Register): void {
    this.store.dispatch(RegisterPageActions.register({ credentials }));
  }

  ngOnDestroy(): void {
    this.clearErrors();
  }


}
