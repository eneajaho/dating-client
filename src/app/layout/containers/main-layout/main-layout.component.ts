import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { routerAnimation } from '@shared/animations/router.animation';

import { AuthState, selectAuthenticatedUser } from '@auth/store/reducers';
import { logout } from '@auth/store/actions/auth.actions';

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ routerAnimation ]
})
export class MainLayoutComponent {

  user$ = this.store.select(selectAuthenticatedUser);

  constructor(private store: Store<AuthState>) { }

  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.animation ?? '*';
  }

  handleLogout(): void {
    this.store.dispatch(logout());
  }

}
