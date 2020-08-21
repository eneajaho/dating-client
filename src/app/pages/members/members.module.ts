import { NgModule } from '@angular/core';

import { MembersRoutingModule } from './members-routing.module';
import { FormsModule } from "@angular/forms";
import { SharedModule } from "@shared/shared.module";
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from "ngx-bootstrap/tabs";
import { TagInputModule } from 'ngx-chips';

import { MembersStoreModule } from "@members/store/members-store.module";

import {
  MemberDetailsComponent,
  MemberEditComponent,
  MembersComponent,
  MembersSearchComponent
} from '@members/containers';

import {
  MemberCardComponent,
  MemberDetailsCardComponent,
  MemberEditAccountComponent,
  MemberEditHeaderComponent,
  MemberEditNavigationComponent,
  MemberEditPhotosComponent,
  MemberEditProfileComponent,
  MembersSearchFormComponent
} from '@members/components';
import { BsDropdownModule } from "ngx-bootstrap/dropdown";


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
    MembersSearchComponent,
    MembersSearchFormComponent,
  ],
  imports: [
    SharedModule,
    MembersRoutingModule,
    MembersStoreModule,
    TagInputModule,
    CarouselModule.forRoot(),
    TabsModule.forRoot(),
    FormsModule,
    BsDropdownModule.forRoot({
      isAnimated: true,
      autoClose: true
    }),
  ]
})
export class MembersModule {}


