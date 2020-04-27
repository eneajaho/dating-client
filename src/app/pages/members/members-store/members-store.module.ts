import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";
import * as fromMembers from "./reducers/members.reducers";
import { EffectsModule } from "@ngrx/effects";
import { MembersEffects } from "./effects/members.effects";
import { MemberService } from "./services/member.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('members', fromMembers.reducer),
    EffectsModule.forFeature([ MembersEffects ])
  ],
  providers: [
    MemberService
  ]
})
export class MembersStoreModule { }
