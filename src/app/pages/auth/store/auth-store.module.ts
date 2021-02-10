import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from '@auth/store/effects';
import { authFeatureKey, authFeatureReducer } from '@auth/store/reducers';

@NgModule({
  imports: [
    StoreModule.forFeature(authFeatureKey, authFeatureReducer),
    EffectsModule.forFeature([ AuthEffects ])
  ]
})
export class AuthStoreModule { }
