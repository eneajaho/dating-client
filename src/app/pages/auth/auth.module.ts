import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { AuthRoutingModule } from './auth-routing.module';

import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthLayoutComponent, LoginComponent, RegisterComponent } from '@auth/containers';

import { SharedModule } from "@shared/index";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthFormComponent,
    AuthLayoutComponent,
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule {}
