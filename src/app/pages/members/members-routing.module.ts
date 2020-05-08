import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersComponent, MemberDetailsComponent, MemberEditComponent }
  from "@members/containers";
import { MembersGuard } from "@members/guards";
import { MemberEditAccountComponent, MemberEditProfileComponent } from "@members/components";
import { NotFoundComponent } from "@layout/components";

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
    canActivate: [ MembersGuard ],
    component: MemberEditComponent,
    children: [
      {
        path: '', redirectTo: 'profile', pathMatch: 'full'
      },
      {
        path: 'account', component: MemberEditAccountComponent
      },
      {
        path: 'profile', component: MemberEditProfileComponent
      },
      {
        path: '**', component: NotFoundComponent
      }
    ]
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
