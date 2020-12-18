import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import * as fromSettings from './reducers';
import { PhotosEffects, SettingsEffects } from "@settings/store/effects";

@NgModule({
  imports: [
    CommonModule,

    StoreModule.forFeature(
      fromSettings.settingsFeatureKey,
      fromSettings.reducer
    ),

    EffectsModule.forFeature([
      SettingsEffects,
      PhotosEffects,
    ])

  ]
})
export class SettingsStoreModule { }
