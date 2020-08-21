import { NgModule } from '@angular/core';

import { RouterModule } from "@angular/router";

import { EmptyLayoutComponent, MainLayoutComponent } from '@layout/containers';
import { NavigationComponent, NotFoundComponent, ThemeToggleComponent } from '@layout/components';

import { SharedModule } from "@shared/index";

@NgModule({
  declarations: [
    NavigationComponent,
    MainLayoutComponent,
    EmptyLayoutComponent,
    NotFoundComponent,
    ThemeToggleComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
  ],
  exports: [
    NavigationComponent
  ]
})
export class LayoutModule {}
