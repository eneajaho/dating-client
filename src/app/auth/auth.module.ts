import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './containers/auth/auth.component';
import { LoginComponent } from './containers/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterComponent } from './containers/register/register.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    LoginFormComponent,
    RegisterComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
