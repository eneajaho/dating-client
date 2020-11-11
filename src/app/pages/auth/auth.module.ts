import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full',
  },
  {
    path: '', component: AuthLayoutComponent, children: [
      {
        path: 'login',
        loadChildren: async () => (await import('./login/login.module')).LoginModule
      },
      {
        path: 'register',
        loadChildren: async () => (await import('./register/register.module')).RegisterModule
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
export class AuthModule {
}
