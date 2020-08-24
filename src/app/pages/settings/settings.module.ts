import { NgModule } from '@angular/core';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from "@settings/containers";
import {
  MemberEditAccountComponent,
  SettingsHeaderComponent,
  MemberEditNavigationComponent,
  MemberEditPhotosComponent,
  MemberEditProfileComponent
} from "@settings/components";
import { SharedModule } from "@shared/shared.module";
import { TagInputModule } from "ngx-chips";
import { SettingsStoreModule } from "@settings/store/settings-store.module";


@NgModule({
  declarations: [
    SettingsComponent,
    SettingsHeaderComponent,
    MemberEditNavigationComponent,
    MemberEditAccountComponent,
    MemberEditProfileComponent,
    MemberEditPhotosComponent,
  ],
  imports: [
    SettingsRoutingModule,
    SharedModule,
    SettingsStoreModule,
    TagInputModule
  ]
})
export class SettingsModule { }
