import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routerAnimation } from '@shared/animations/router.animation';

@Component({
  selector: 'app-auth-layout',
  template: `
    <div class="p-0 m-0 vh-100">
      <div class="row p-0 m-0">
        <div class="col-xs-11 col-sm-9 col-md-7 col-lg-6">
          <div class="row align-items-center justify-content-center h-100">
            <div [@routerAnimations]="prepareRoute(outlet)"
                 class="col-12 col-sm-10 col-md-8 col-lg-7">
              <router-outlet #outlet="outlet"></router-outlet>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-3 col-md-5 col-lg-6 p-0 m-0">
          <div class="auth-image"></div>
          <a class="unsplash" target="_blank" rel="noopener noreferrer"
             href="https://unsplash.com/@carlesrgm?utm_campaign=photographer-credit&amp;utm_content=creditBadge"
             title="Download free do whatever you want high-resolution photos from Carles Rabada">
            <span class="d-inline-block py-1 px-2">Carles Rabada</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./auth-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [ routerAnimation ],
})
export class AuthLayoutComponent {
  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.animation;
  }
}
