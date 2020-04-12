import { Component, OnInit } from '@angular/core';
import { Login } from "../../models/Login.model";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { User } from "../../models/User.model";
import { AuthActions, AuthSelectors, RootStoreState } from "../../../root-store";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  user$: Observable<User>;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  constructor(private store$: Store<RootStoreState.State>) { }

  ngOnInit() {
    this.user$ = this.store$.select(AuthSelectors.selectAuthUser);

    this.error$ = this.store$.select(AuthSelectors.selectAuthError);

    this.isLoading$ = this.store$.select(AuthSelectors.selectAuthLoading);
  }

  handleLogin(credentials: Login) {
    this.store$.dispatch(AuthActions.LOGIN_REQUEST({ credentials }));
  }

}
