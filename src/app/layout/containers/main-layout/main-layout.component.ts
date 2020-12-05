import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";

import { routerAnimation } from "@shared/animations";
import { AuthActions } from "@auth/store/actions";
import * as fromAuth from '@auth/store/reducers';

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ routerAnimation ]
})
export class MainLayoutComponent {

  user$ = this.store.select(fromAuth.selectUser);

  constructor(private store: Store<fromAuth.State>) { }

  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.animation ?? '*';
  }

  handleLogout(): void {
    this.store.dispatch(AuthActions.logout());
  }

}
