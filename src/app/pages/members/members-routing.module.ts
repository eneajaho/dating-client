import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersComponent, MemberDetailsComponent, MemberEditComponent }
  from "@members/containers";
import { MembersGuard, PreventUnsavedChangesGuard } from "@members/guards";
import { MemberEditAccountComponent, MemberEditProfileComponent } from "@members/components";
import { NotFoundComponent } from "@layout/components";
import { MemberEditPhotosComponent } from "@members/components/member-edit-components/member-edit-photos/member-edit-photos.component";

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
        canDeactivate: [ ],
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
