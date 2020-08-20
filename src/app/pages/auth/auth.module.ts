import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AuthFormComponent, RegisterFormComponent } from '@auth/components';
import { AuthLayoutComponent, LoginComponent, RegisterComponent } from '@auth/containers';

import { SharedModule } from "@shared/index";

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full',
  },
  {
    path: '', component: AuthLayoutComponent, children: [
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      }
    ]
  },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthFormComponent,
    AuthLayoutComponent,
    RegisterFormComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [ RouterModule ]
})
export class AuthModule {}
