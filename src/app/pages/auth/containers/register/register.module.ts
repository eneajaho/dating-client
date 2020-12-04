import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from "./register-form/register-form.component";
import { RegisterComponent } from "./register.component";
import { RouterModule, Routes } from "@angular/router";
import { ErrorAlertModule, SpinnerModule } from "@shared/components";
import { ReactiveFormsModule } from "@angular/forms";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";

export const routes: Routes = [ {
  path: '', component: RegisterComponent
} ];

@NgModule({
  declarations: [
    RegisterComponent,
    RegisterFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BsDatepickerModule.forRoot(),
    ErrorAlertModule,
    ReactiveFormsModule,
    SpinnerModule
  ],
  exports: [ RouterModule ]
})
export class RegisterModule { }
