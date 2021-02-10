import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MemberEffects, MembersEffects } from '@members/store/effects';
import * as fromMembers from '@members/store/reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromMembers.membersFeatureKey,
      fromMembers.reducer
    ),
    EffectsModule.forFeature([
      MembersEffects,
      MemberEffects,
    ])
  ],
})
export class MembersStoreModule {}
