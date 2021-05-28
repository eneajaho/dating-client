import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MemberDetailsComponent } from '@members/pages/member-details/member-details.component';
import { MembersModule } from '@members/members.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GoBackModule } from '@shared/directives/go-back/go-back.module';
import { MemberDetailsCardComponent } from '@members/pages/member-details/member-details-card/member-details-card.component';
import { TimeAgoModule } from '@shared/pipes/time-ago/time-ago.module';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CarouselModule } from 'ngx-bootstrap/carousel';

const routes: Routes = [
  {
    path: ':memberId',
    component: MemberDetailsComponent,
  }
];


@NgModule({
  declarations: [
    MemberDetailsComponent,
    MemberDetailsCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MembersModule,
    FontAwesomeModule,
    GoBackModule,
    TimeAgoModule,
    TabsModule.forRoot(),
    CarouselModule.forRoot(),
  ],

})
export class SettingsModule { }
