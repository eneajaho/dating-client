import { NgModule } from '@angular/core';

import { MembersRoutingModule } from './members-routing.module';
import { SharedModule } from "@shared/shared.module";
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from "ngx-bootstrap/tabs";
import { TagInputModule } from 'ngx-chips';

import { MembersStoreModule } from "@members/store/members-store.module";

import { MemberDetailsComponent, MemberEditComponent, MembersComponent, } from '@members/containers';

import {
  MemberCardComponent,
  MemberDetailsCardComponent,
  MemberEditAccountComponent,
  MemberEditHeaderComponent,
  MemberEditNavigationComponent,
  MemberEditPhotosComponent,
  MemberEditProfileComponent
} from '@members/components';

import { FormsModule } from "@angular/forms";

/**
 * MembersModule and MembersStoreModule will be lazy loaded.
 * In this way we don't initialize the members store when it is not used.
 **/

@NgModule({
  declarations: [
    MembersComponent,
    MemberEditComponent,
    MemberCardComponent,
    MemberDetailsComponent,
    MemberDetailsCardComponent,
    MemberEditNavigationComponent,
    MemberEditHeaderComponent,
    MemberEditAccountComponent,
    MemberEditProfileComponent,
    MemberEditPhotosComponent,
  ],
  imports: [
    SharedModule,
    MembersRoutingModule,
    MembersStoreModule,
    TagInputModule,
    CarouselModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule,
  ]
})
export class MembersModule {}


