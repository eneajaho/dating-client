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
import { TagInputModule } from "ngx-chips";
import { SettingsStoreModule } from "@settings/store/settings-store.module";
import { ErrorAlertModule, FileUploaderModule, SpinnerModule } from "@shared/components";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";


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
    CommonModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    SettingsStoreModule,
    FileUploaderModule,
    FontAwesomeModule,
    ErrorAlertModule,
    TagInputModule,
    SpinnerModule,
  ]
})
export class SettingsModule { }
