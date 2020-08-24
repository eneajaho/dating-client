import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from "@layout/components";
import { SettingsComponent } from "@settings/containers";
import { MemberEditAccountComponent, MemberEditProfileComponent, MemberEditPhotosComponent } from "@settings/components";
import { PreventUnsavedChangesGuard, SettingsGuard } from "@settings/guards";

const routes: Routes = [
  {
    path: '',
    canActivate: [ SettingsGuard ],
    component: SettingsComponent,
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
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
