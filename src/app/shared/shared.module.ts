import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { GoBackComponent, SpinnerComponent } from '@shared/components';
import { ReactiveFormsModule } from "@angular/forms";

export const COMPONENTS = [
  GoBackComponent,
  SpinnerComponent
]

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot({
      isAnimated: true,
      autoClose: true
    })
  ],
  exports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BsDropdownModule,
    ...COMPONENTS
  ]
})
export class SharedModule { }
