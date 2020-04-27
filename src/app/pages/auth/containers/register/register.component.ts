import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "@root-store/index";
import { AuthActions, AuthSelectors } from "@root-store/auth-store";
import { Credentials } from "@pages/auth/models/Credentials";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent implements OnInit {

  error$: Observable<any>;
  isLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.error$ = this.store.select(AuthSelectors.selectAuthRegisterError);
    this.isLoading$ = this.store.select(AuthSelectors.selectAuthLoading);
  }

  handleRegister(credentials: Credentials) {
    this.store.dispatch(AuthActions.REGISTER_REQUEST({ credentials }));
  }


}
