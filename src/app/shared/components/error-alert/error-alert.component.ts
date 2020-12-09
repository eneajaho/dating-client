import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'error-alert',
  template: `
    <ng-container *ngIf="error">
      <div class="alert alert-error error cp mb-1"
           [ngStyle]="{ display: inline ? 'inline' : 'block' }">
        {{ error }}
        <ng-content></ng-content>
      </div>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorAlertComponent {

  /**
  * String error message.
  * @default null
  * */
  @Input() error: string | null = null;

  /**
  * If set to true the error alert box will be inlined.
  * @default false
  */
  @Input() inline: boolean = false;

}
