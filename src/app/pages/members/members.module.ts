import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { MembersStoreModule } from "./members-store/members-store.module";
import { MembersComponent } from './containers/members/members.component';

/**
 * MembersModule and MembersStoreModule will be lazy loaded.
 * In this way we don't initialize the members store when it is not used.
 **/

@NgModule({
  declarations: [
    MembersComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    MembersStoreModule
  ]
})
export class MembersModule { }


