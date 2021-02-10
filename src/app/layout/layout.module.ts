import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { EmptyLayoutComponent, MainLayoutComponent } from '@layout/containers';
import { NavigationComponent } from '@layout/components/navigation/navigation.component';
import { ThemeToggleComponent } from '@layout/components/theme-toggle/theme-toggle.component';
import { NotFoundComponent } from '@layout/components/not-found.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    NavigationComponent,
    MainLayoutComponent,
    EmptyLayoutComponent,
    ThemeToggleComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    BsDropdownModule.forRoot({
      isAnimated: true,
      autoClose: true
    }),
  ]
})
export class LayoutModule {
}
