import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersComponent } from "./containers/members/members.component";
import { MemberDetailsComponent } from "@pages/members/containers/member-details/member-details.component";
import { MemberEditGuard, MembersGuard } from "@pages/members/guards";
import { MemberEditComponent } from "@pages/members/containers/member-edit/member-edit.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full'
  },
  {
    path: 'all',
    canActivate: [ MembersGuard ],
    component: MembersComponent
  },
  {
    path: 'edit',
    canActivate: [ MemberEditGuard ],
    component: MemberEditComponent
  },
  {
    path: ':memberId',
    canActivate: [ MembersGuard ],
    component: MemberDetailsComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MembersRoutingModule {}
