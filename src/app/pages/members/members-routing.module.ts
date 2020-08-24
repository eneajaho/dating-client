import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  MemberDetailsComponent,
  MembersComponent,
  MembersSearchComponent
} from "@members/containers";
import { MemberGuard, MembersGuard } from "@members/guards";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: 'search',
    component: MembersSearchComponent
  },
  {
    path: 'all',
    canActivate: [ MembersGuard ],
    component: MembersComponent
  },
  {
    path: ':memberId',
    canActivate: [ MemberGuard ],
    component: MemberDetailsComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MembersRoutingModule {}
