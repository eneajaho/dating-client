import { NgModule } from '@angular/core';

import { MembersStoreModule } from '@members/store/members-store.module';
import { SettingsStoreModule } from '@settings/store/settings-store.module';
import { RouterModule, Routes } from '@angular/router';
import { MemberGuard, MembersGuard } from '@members/guards';

/**
 * MembersModule and MembersStoreModule will be lazy loaded.
 * In this way we don't initialize the members store when it is not used.
 **/

const routes: Routes = [
  {
    path: 'all',
    canActivate: [ MembersGuard ],
    loadChildren: async () =>
      (await import('./pages/members/all-members.module'))
        .AllMembersModule
  },
  {
    path: 'search',
    loadChildren: async () =>
      (await import('./pages/members-search/members-search.module'))
        .MembersSearchModule
  },
  {
    path: 'details',
    canActivate: [ MemberGuard ],
    loadChildren: async () =>
      (await import('./pages/member-details/member-details.module'))
        .SettingsModule
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    MembersStoreModule,
    // for the moment Settings Store is loaded also here because of profile page
    // will be changed later, because another profile page will be created
    SettingsStoreModule
  ],
  exports: [ RouterModule ]
})
export class MembersModule { }


