import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AuthLayoutComponent } from './containers/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full',
  },
  {
    path: '', component: AuthLayoutComponent, children: [
      {
        path: 'login',
        loadChildren: async () => (await import('./containers/login/login.module')).LoginModule,
        data: { animation: 'Login'}
      },
      {
        path: 'register',
        loadChildren: async () => (await import('./containers/register/register.module')).RegisterModule,
        data: { animation: 'Register'}
      }
    ]
  },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full'
  }
];

@NgModule({
  declarations: [ AuthLayoutComponent ],
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AuthModule { }
