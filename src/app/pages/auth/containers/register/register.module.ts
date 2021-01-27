import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { ErrorAlertModule, SpinnerModule } from '@shared/components';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    RegisterComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [ { path: '', component: RegisterComponent } ]
    ),
    BsDatepickerModule.forRoot(),
    ErrorAlertModule,
    ReactiveFormsModule,
    SpinnerModule
  ],
  exports: [ RouterModule ]
})
export class RegisterModule { }
