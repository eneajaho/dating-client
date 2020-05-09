import { NgModule } from '@angular/core';

import { MembersRoutingModule } from './members-routing.module';
import { SharedModule } from "@shared/shared.module";
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from "ngx-bootstrap/tabs";
import { TagInputModule } from 'ngx-chips';

import { MembersStoreModule } from "@members/store/members-store.module";

import { MemberDetailsComponent, MembersComponent, MemberEditComponent } from '@members/containers';
import { MemberCardComponent, MemberDetailsCardComponent } from '@members/components';

import { MemberEditNavigationComponent } from '@members/components';
import { MemberEditHeaderComponent } from '@members/components';
import { MemberEditAccountComponent } from '@members/components';
import { MemberEditProfileComponent } from '@members/components';
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


