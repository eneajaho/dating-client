import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from "@layout/components";
import { MemberDetailsComponent, MemberEditComponent, MembersComponent } from "@members/containers";
import { MembersGuard, PreventUnsavedChangesGuard } from "@members/guards";
import { MemberEditAccountComponent, MemberEditPhotosComponent, MemberEditProfileComponent } from "@members/components";

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
        path: 'account',
        canDeactivate: [ PreventUnsavedChangesGuard ],
        component: MemberEditAccountComponent
      },
      {
        path: 'profile',
        canDeactivate: [ PreventUnsavedChangesGuard ],
        component: MemberEditProfileComponent
      },
      {
        path: 'photos',
        canDeactivate: [],
        component: MemberEditPhotosComponent
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
