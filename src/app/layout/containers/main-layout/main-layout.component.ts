import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import * as fromAuth from '@auth/store/reducers';
import { AuthActions } from "@auth/store/actions";

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit {

  user$: Observable<any>;

  constructor(private store: Store<fromAuth.State>) { }

  ngOnInit() {
    this.user$ = this.store.select(fromAuth.selectUser);
  }

  handleLogout() {
    this.store.dispatch(AuthActions.logout());
  }

}
