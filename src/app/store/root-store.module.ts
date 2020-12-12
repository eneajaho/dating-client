import { NgModule } from '@angular/core';

import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { CustomSerializer, metaReducers, ROOT_REDUCERS } from "@store/reducers";
import { RootEffects } from "@store/effects/root.effects";
import { AuthStoreModule } from "@auth/store/auth-store.module";
import { extModules } from "../build-specifics";

@NgModule({
  imports: [
    /**
    * AuthModule is lazy-loaded
    * AuthStoreModule is eagerly loaded
    */
    AuthStoreModule,

    StoreModule.forRoot(ROOT_REDUCERS, { metaReducers }),
    EffectsModule.forRoot([ RootEffects ]),
    StoreRouterConnectingModule.forRoot({ serializer: CustomSerializer }),

    // Instrumentation must be imported after importing StoreModule
    extModules
  ]
})
export class RootStoreModule { }

