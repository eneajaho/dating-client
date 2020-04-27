import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from "@angular/router";
import { MainLayoutComponent } from './containers/main-layout/main-layout.component';
import { EmptyLayoutComponent } from './containers/empty-layout/empty-layout.component';
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [
    NavigationComponent,
    MainLayoutComponent,
    EmptyLayoutComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [ NavigationComponent ]
})
export class LayoutModule {}
