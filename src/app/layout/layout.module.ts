import { NgModule } from '@angular/core';

import { RouterModule } from "@angular/router";

import { MainLayoutComponent, EmptyLayoutComponent } from '@layout/containers';
import { NavigationComponent, NotFoundComponent } from '@layout/components';

import { SharedModule } from "@shared/index";

@NgModule({
  declarations: [
    NavigationComponent,
    MainLayoutComponent,
    EmptyLayoutComponent,
    NotFoundComponent,
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
