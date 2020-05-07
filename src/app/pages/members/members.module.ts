import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { MembersStoreModule } from "./members-store/members-store.module";
import { MembersComponent } from './containers/members/members.component';
import { MemberCardComponent } from './components/member-card/member-card.component';
import { SharedModule } from "../../shared/shared.module";
import { MemberDetailsComponent } from './containers/member-details/member-details.component';
import { MemberDetailsCardComponent } from './components/member-details-card/member-details-card.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from "ngx-bootstrap/tabs";
import { MemberEditComponent } from './containers/member-edit/member-edit.component';

/**
 * MembersModule and MembersStoreModule will be lazy loaded.
 * In this way we don't initialize the members store when it is not used.
 **/

@NgModule({
  declarations: [
    MembersComponent,
    MemberCardComponent,
    MemberDetailsComponent,
    MemberDetailsCardComponent,
    MemberEditComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    MembersStoreModule,
    SharedModule,
    CarouselModule.forRoot(),
    TabsModule.forRoot()
  ]
})
export class MembersModule { }


