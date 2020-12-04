import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeService } from "@layout/services";

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthLayoutComponent {

  constructor(private layout: ThemeService) {
    layout.light();
  }
}
