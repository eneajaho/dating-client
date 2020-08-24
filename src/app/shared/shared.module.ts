import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { FileUploaderComponent, GoBackComponent, SpinnerComponent, ErrorAlertComponent } from '@shared/components';
import { ReactiveFormsModule } from "@angular/forms";
import { DropzoneDirective } from './directives/dropzone.directive';
import { TimeAgoPipe } from './pipes/time-ago.pipe';
import { LoadingDirective } from './directives/loading.directive';

export const COMPONENTS = [
  GoBackComponent,
  SpinnerComponent,
  FileUploaderComponent,
  ErrorAlertComponent,
]

@NgModule({
  declarations: [
    ...COMPONENTS,
    DropzoneDirective,
    TimeAgoPipe,
    LoadingDirective,
    LoadingDirective,
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
    TimeAgoPipe,
    ...COMPONENTS,
    LoadingDirective
  ]
})
export class SharedModule { }
