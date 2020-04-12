import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { AuthActions, AuthSelectors, RootStoreState } from "./root-store";
import { Observable } from "rxjs";
import { User } from "./auth/models/User.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{

  user$: Observable<User>;

  constructor(private store: Store<RootStoreState.State>) {}

  ngOnInit() {
    this.user$ = this.store.select(AuthSelectors.selectAuthUser)
  }

  handleLogout() {
    this.store.dispatch(AuthActions.LOGOUT());
  }

}
