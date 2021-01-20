import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  MemberDetailsComponent,
  MembersComponent,
  MembersSearchComponent
} from '@members/containers';
import { MemberGuard, MembersGuard } from '@members/guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: 'search',
    component: MembersSearchComponent,
    data: { animation: 'Search'}
  },
  {
    path: 'all',
    canActivate: [ MembersGuard ],
    component: MembersComponent,
    data: { animation: 'AllMembers'}
  },
  {
    path: ':memberId',
    canActivate: [ MemberGuard ],
    component: MemberDetailsComponent,
    data: { animation: 'SingleMember'}
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MembersRoutingModule {}
