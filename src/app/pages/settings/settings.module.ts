import { NgModule } from '@angular/core';
import {
  MemberEditAccountComponent,
  MemberEditNavigationComponent,
  MemberEditPhotosComponent,
  MemberEditProfileComponent,
  SettingsHeaderComponent
} from '@settings/components';
import { TagInputModule } from 'ngx-chips';
import { SettingsStoreModule } from '@settings/store/settings-store.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileUploaderModule } from '@shared/components/file-uploader/file-uploader.module';
import { ErrorAlertModule } from '@shared/components/error-alert/error-alert.module';
import { SpinnerModule } from '@shared/components/spinner/spinner.module';
import { RouterModule, Routes } from '@angular/router';
import { PreventUnsavedChangesGuard, SettingsGuard, PhotosGuard } from '@settings/guards';
import { NotFoundComponent } from '@layout/components/not-found.component';
import { SettingsLayoutComponent } from './settings-layout.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [ SettingsGuard ],
    component: SettingsLayoutComponent,
    children: [
      {
        path: '', redirectTo: 'profile', pathMatch: 'full'
      },
      {
        path: 'account',
        canDeactivate: [ PreventUnsavedChangesGuard ],
        component: MemberEditAccountComponent,
        data: { animation: 'Account'}
      },
      {
        path: 'profile',
        canDeactivate: [ PreventUnsavedChangesGuard ],
        component: MemberEditProfileComponent,
        data: { animation: 'Profile'}
      },
      {
        path: 'photos',
        canActivate: [ PhotosGuard ],
        component: MemberEditPhotosComponent,
        data: { animation: 'Photos'}
      },
      {
        path: '**', component: NotFoundComponent
      }
    ]
  },
];


@NgModule({
  declarations: [
    SettingsLayoutComponent,
    SettingsHeaderComponent,
    MemberEditNavigationComponent,
    MemberEditAccountComponent,
    MemberEditProfileComponent,
    MemberEditPhotosComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

    SettingsStoreModule,

    FileUploaderModule,
    FontAwesomeModule,
    ErrorAlertModule,
    TagInputModule,
    SpinnerModule,
  ],
  providers: [
    SettingsGuard,
    PhotosGuard
  ]
})
export class SettingsModule { }
