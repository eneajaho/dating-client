import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from "./not-found.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [ NotFoundComponent ],
  imports: [ CommonModule, FontAwesomeModule, RouterModule ],
  exports: [ NotFoundComponent ]
})
export class NotFoundModule {
}
