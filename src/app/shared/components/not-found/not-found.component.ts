import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'not-found',
  template: `
    <div class="container pt-5">
      <div class="row justify-content-center align-items-center pt-5">
        <div class="col-xs-12 col-sm-10 col-md-8 col-lg-6">
          <h1 class="display-3 text-center">
            404 Not Found
          </h1>
          <h1 class="font-weight-light text-center">
            It looks like you're lost!
          </h1>
          <div class="d-flex justify-content-center mt-4">
            <ng-template #defaultTemplate>
              <button routerLink="/members" class="btn btn-lg btn-primary">
                <fa-icon [icon]="homeIcon" class="mr-2"></fa-icon>
                Go home
              </button>
            </ng-template>
            <ng-container *ngTemplateOutlet="templateOutlet || defaultTemplate"></ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [ ` h1 { color: var(--text-color) } `]
})
export class NotFoundComponent {

  homeIcon = faHome;

  @Input() templateOutlet: TemplateRef<any>;

}
