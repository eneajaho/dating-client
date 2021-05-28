import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from '@members/pages/members/members.component';
import { MembersModule } from '@members/members.module';
import { SpinnerModule } from '@shared/components/spinner/spinner.module';
import { ErrorAlertModule } from '@shared/components/error-alert/error-alert.module';
import { MemberCardComponent } from '@members/pages/members/member-card/member-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
  {
    path: '',
    component: MembersComponent
  }
];


@NgModule({
  declarations: [
    MembersComponent,
    MemberCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MembersModule,
    SpinnerModule,
    ErrorAlertModule,
    FontAwesomeModule,
  ],

})
export class AllMembersModule { }
