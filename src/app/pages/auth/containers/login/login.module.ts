import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ErrorAlertModule, SpinnerModule } from '@shared/components';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(
      [ { path: '', component: LoginComponent } ]
    ),
    ErrorAlertModule,
    SpinnerModule
  ],
  exports: [ RouterModule ]
})
export class LoginModule {
}
