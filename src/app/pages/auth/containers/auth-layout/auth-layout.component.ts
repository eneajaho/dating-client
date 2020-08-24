import { Component } from '@angular/core';
import { LayoutService } from "@layout/services";

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent {

  constructor(private layout: LayoutService) {
    layout.light();
  }
}
