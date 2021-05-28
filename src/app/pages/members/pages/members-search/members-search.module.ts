import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembersSearchComponent } from '@members/pages/members-search/members-search.component';
import { MembersSearchFormComponent } from '@members/pages/members-search/members-search-form/members-search-form.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


const routes: Routes = [
  {
    path: '',
    component: MembersSearchComponent,
  }
];


@NgModule({
  declarations: [
    MembersSearchComponent,
    MembersSearchFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    RouterModule
  ]
})
export class MembersSearchModule {
}
