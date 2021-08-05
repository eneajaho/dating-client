import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '@pages/auth/login/login.component';
import { RegisterComponent } from '@auth/register/register.component';
import { LoginFormComponent } from '@pages/auth/login/login-form.component';
import { RegisterFormComponent } from '@auth/register/register-form/register-form.component';
import { AuthLayoutComponent } from '@auth/auth-layout/auth-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ErrorAlertModule } from '@shared/components/error-alert/error-alert.module';
import { SpinnerModule } from '@shared/components/spinner/spinner.module';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full',
  },
  {
    path: '', component: AuthLayoutComponent, children: [
      {
        path: 'login',
        component: LoginComponent,
        data: { animation: 'Login' }
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: { animation: 'Register' }
      }
    ]
  },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginComponent,
    LoginFormComponent,
    RegisterComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ErrorAlertModule,
    SpinnerModule
  ],
  exports: [ RouterModule ]
})
export class AuthModule {
}
