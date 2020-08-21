import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Theme } from "@layout/services/layout.service";

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent {

  @Input() theme: Theme;

}
