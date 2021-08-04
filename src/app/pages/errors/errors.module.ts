import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorsComponent } from './errors.component';
import { Routes, RouterModule } from '@angular/router';
import { ServerErrorComponent } from './server-error.component';
import { SafeHtmlPipeModule } from '@shared/pipes/safe-html.pipe';

const routes: Routes = [
  { path: '', component: ErrorsComponent },
  { path: 'server', component: ServerErrorComponent }
];

@NgModule({
  declarations: [
    ErrorsComponent,
    ServerErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SafeHtmlPipeModule
  ],
  exports: [RouterModule]
})
export class ErrorsModule { }
