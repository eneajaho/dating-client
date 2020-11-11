import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from "@settings/containers";
import {
  MemberEditAccountComponent,
  MemberEditProfileComponent,
  MemberEditPhotosComponent
} from "@settings/components";
import { PreventUnsavedChangesGuard, SettingsGuard } from "@settings/guards";
import { NotFoundComponent, NotFoundModule } from "@shared/components";


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
  imports: [ NotFoundModule, RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class SettingsRoutingModule {
}
