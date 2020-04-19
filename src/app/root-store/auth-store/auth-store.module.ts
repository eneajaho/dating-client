import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./effects/auth.effects";
import { StoreModule } from "@ngrx/store";
import * as fromAuth from "./reducers/auth.reducers";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [AuthEffects]
})
export class AuthStoreModule { }
