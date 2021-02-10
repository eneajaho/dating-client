import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { ThemeService } from '@layout/services';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThemeToggleComponent {

  constructor(private theme: ThemeService) {}

  theme$ = this.theme.theme$;

  @HostListener('click')
  toggle(): void { this.theme.toggle(); }
}
