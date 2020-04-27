import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { Credentials } from "../../models/Credentials";
import { AppState } from "@root-store/index";
import { AuthActions, AuthSelectors } from '@root-store/auth-store';

@Component({
  selector: 'auth-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  error$: Observable<any>;
  isLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.error$ = this.store.select(AuthSelectors.selectAuthLoginError);
    this.isLoading$ = this.store.select(AuthSelectors.selectAuthLoading);
  }

  handleLogin(credentials: Credentials) {
    this.store.dispatch(AuthActions.LOGIN_REQUEST({ credentials }));
  }

}
