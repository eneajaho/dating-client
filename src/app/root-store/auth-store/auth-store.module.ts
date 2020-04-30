import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AuthEffects } from "./effects/auth.effects";
import { AuthReducers } from "./index";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', AuthReducers.reducer),
    EffectsModule.forFeature([ AuthEffects ]),
  ],
  providers: [ ]
})
export class AuthStoreModule { }
