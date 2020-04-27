import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "@root-store/index";
import { AuthActions, AuthSelectors } from "@root-store/auth-store";
import { User } from "@models/User";

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  user$: Observable<User> = this.store.select(AuthSelectors.selectAuthUser);

  constructor(private store: Store<AppState>) {}

  handleLogout() {
    this.store.dispatch(AuthActions.LOGOUT());
  }

}
