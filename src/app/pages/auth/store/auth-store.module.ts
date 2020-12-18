import { NgModule } from '@angular/core';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import * as fromAuth from './reducers';
import { AuthEffects, LoginEffects, RegisterEffects } from "@auth/store/effects";

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromAuth.authFeatureKey,
      fromAuth.reducer
    ),
    EffectsModule.forFeature([
      AuthEffects,
      LoginEffects,
      RegisterEffects,
    ])
  ]
})
export class AuthStoreModule { }
