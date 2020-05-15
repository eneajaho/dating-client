import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { GoBackComponent, SpinnerComponent, FileUploaderComponent } from '@shared/components';
import { ReactiveFormsModule } from "@angular/forms";
import { DropzoneDirective } from './directives/dropzone.directive';

export const COMPONENTS = [
  GoBackComponent,
  SpinnerComponent,
  FileUploaderComponent
]

@NgModule({
  declarations: [
    ...COMPONENTS,
    DropzoneDirective,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot({
      isAnimated: true,
      autoClose: true
    }),
    BsDatepickerModule.forRoot()
  ],
  exports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BsDropdownModule,
    BsDatepickerModule,
    ...COMPONENTS
  ]
})
export class SharedModule { }
