import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { AuthRoutingModule } from './auth-routing.module';

import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthLayoutComponent } from './containers/auth-layout/auth-layout.component';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';


@NgModule({
  declarations: [
    AuthLayoutComponent,
    AuthFormComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }
