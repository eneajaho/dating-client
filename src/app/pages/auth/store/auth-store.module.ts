import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import * as fromAuth from './reducers';
import { AuthEffects, LoginEffects, RegisterEffects } from "@auth/store/effects";

@NgModule({
  imports: [
    CommonModule,

    StoreModule.forFeature(
      fromAuth.authFeatureKey,
      fromAuth.reducers
    ),

    EffectsModule.forFeature([
      AuthEffects,
      LoginEffects,
      RegisterEffects,
    ])

  ]
})
export class AuthStoreModule { }
