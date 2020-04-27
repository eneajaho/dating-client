import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from "@angular/router";
import { MainLayoutComponent } from './containers/main-layout/main-layout.component';
import { EmptyLayoutComponent } from './containers/empty-layout/empty-layout.component';

@NgModule({
  declarations: [
    NavigationComponent,
    MainLayoutComponent,
    EmptyLayoutComponent
  ],
  imports: [ CommonModule, RouterModule ],
  exports: [ NavigationComponent ]
})
export class LayoutModule {}
