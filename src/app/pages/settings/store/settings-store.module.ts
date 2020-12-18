import { NgModule } from '@angular/core';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import * as fromSettings from './reducers';
import { PhotosEffects, SettingsEffects } from "@settings/store/effects";

@NgModule({
  imports: [
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
