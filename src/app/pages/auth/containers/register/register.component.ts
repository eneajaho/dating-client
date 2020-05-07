import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Credentials } from "@auth/models";

import * as fromAuth from '@auth/store/reducers';
import { RegisterPageActions } from "@auth/store/actions";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  error$: Observable<any>;
  loading$: Observable<boolean>;

  constructor(private store: Store<fromAuth.State>) { }

  ngOnInit() {
    this.error$ = this.store.select(fromAuth.selectRegisterPageError);
    this.loading$ = this.store.select(fromAuth.selectRegisterPagePending);
  }

  handleRegister(credentials: Credentials) {
    this.store.dispatch(RegisterPageActions.register({ credentials }));
  }


}
