import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { MemberEffects, MembersEffects, PhotosEffects } from "@members/store/effects";
import * as fromMembers from "@members/store/reducers";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromMembers.membersFeatureKey,
      fromMembers.reducers
    ),
    EffectsModule.forFeature([
      MembersEffects,
      MemberEffects,
      PhotosEffects
    ])
  ],
})
export class MembersStoreModule {}
