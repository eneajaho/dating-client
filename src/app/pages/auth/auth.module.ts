import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthFormComponent, RegisterFormComponent } from '@auth/components';
import { AuthLayoutComponent, LoginComponent, RegisterComponent } from '@auth/containers';

import { SharedModule } from "@shared/index";

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
    AuthRoutingModule,
  ]
})
export class AuthModule {}
