import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeService } from '@layout/services';
import { RouterOutlet } from '@angular/router';
import { routerAnimation } from '@shared/animations';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ routerAnimation ]
})
export class AuthLayoutComponent {

  constructor(private layout: ThemeService) {
    layout.light();
  }

  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.animation;
  }
}
