import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStoreModule } from '../auth/auth-store';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from "../../environments/environment";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),

    StoreDevtoolsModule.instrument({
      maxAge: 10, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),

    AuthStoreModule
  ]
})
export class RootStoreModule { }
