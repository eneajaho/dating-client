import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { User } from "../../models/User.model";
import { Store } from "@ngrx/store";
import { AuthActions, AuthSelectors, RootStoreState } from "../../../root-store";
import { Login } from "../../models/Login.model";

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

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
