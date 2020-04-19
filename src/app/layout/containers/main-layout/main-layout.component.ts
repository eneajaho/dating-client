import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { User } from "../../../auth/models/User.model";
import { Store } from "@ngrx/store";
import { AuthActions, AuthSelectors, RootStoreState } from "../../../root-store";

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  user$: Observable<User>;

  constructor(private store: Store<RootStoreState.State>) {}

  ngOnInit() {
    this.user$ = this.store.select(AuthSelectors.selectAuthUser)
  }

  handleLogout() {
    this.store.dispatch(AuthActions.LOGOUT());
  }

}
