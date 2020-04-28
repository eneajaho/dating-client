import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersComponent } from "./containers/members/members.component";
import { MembersGuard } from "@pages/members/guards/members.guard";
import { MemberDetailsComponent } from "@pages/members/containers/member-details/member-details.component";


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
    path: ':id',
    canActivate: [ MembersGuard ],
    component: MemberDetailsComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class MembersRoutingModule {}
