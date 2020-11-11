import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoBackDirective } from "./go-back.directive";

@NgModule({
  declarations: [ GoBackDirective ],
  imports: [ CommonModule ],
  exports: [ GoBackDirective ]
})
export class GoBackModule { }
