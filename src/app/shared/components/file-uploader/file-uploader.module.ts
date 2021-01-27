import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from './file-uploader.component';
import { DropzoneDirective } from './dropzone.directive';
import { SpinnerModule } from '../spinner/spinner.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [FileUploaderComponent, DropzoneDirective],
  imports: [ CommonModule, SpinnerModule, FontAwesomeModule ],
  exports: [ FileUploaderComponent, DropzoneDirective ]
})
export class FileUploaderModule { }
