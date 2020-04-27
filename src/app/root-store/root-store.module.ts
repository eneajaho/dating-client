import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from "../../environments/environment";
import { AuthStoreModule } from "./auth-store/auth-store.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),

    StoreDevtoolsModule.instrument({
      maxAge: 10,
      logOnly: environment.production,
    }),

    /** AuthStoreModule will be eagerly loaded,
     * so we can have access to authenticated user.
     * AuthModule will be lazy loaded.  **/
    AuthStoreModule
  ]
})
export class RootStoreModule { }
