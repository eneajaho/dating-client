import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [ NavigationComponent ],
  imports: [ CommonModule, RouterModule ],
  exports: [ NavigationComponent ]
})
export class LayoutModule { }
