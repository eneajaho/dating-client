import { NgModule } from '@angular/core';

import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment as env } from "../../environments/environment";

import { CustomSerializer, metaReducers, ROOT_REDUCERS } from "@store/reducers";
import { RootEffects } from "@store/effects/root.effects";
import { AuthStoreModule } from "@auth/store/auth-store.module";

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

    // Won't include StoreDevtoolsModule in production build
    env.production ? [] : StoreDevtoolsModule.instrument({ maxAge: 20 })
  ]
})
export class RootStoreModule { }

