import { NgModule } from '@angular/core';

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
  ]
})
export class AuthModule {}
