import { Component, Input } from '@angular/core';

@Component({
  selector: 'spinner',
  template: `
    <div class="spinner-border {{ color ? 'text-'+color : '' }}"
         [class.small]="size === 'small'"
         [class.text-button]="color === 'button'"
         [class.medium]="size === 'medium'"
         [class.big]="size === 'big'"
         role="status">
      <span class="sr-only">Loading...</span>
    </div>
  `,
  styles: [`
    .spinner-border { color: var(--text-color) }
    .text-button { color: var(--btn-primary-text-color) }
    .small { width: 1.5rem; height: 1.5rem; }
    .medium { width: 5rem; height: 5rem; }
    .big { width: 10rem; height: 10rem; }
    `
  ]
})
export class SpinnerComponent {

  @Input() size: 'small' | 'medium' | 'big' | '' = '';
  @Input() color: string;

}
