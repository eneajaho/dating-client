import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { HttpClientModule } from "@angular/common/http";
import { environment } from "../environments/environment";
import { API_URL } from "./configs/api.token";

import { RootStoreModule } from './root-store';
import { LayoutModule } from './layout/layout.module';
import { RouterModule, Routes } from "@angular/router";
import { AuthModule } from "./auth/auth.module";

const ROUTES: Routes = [
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    RootStoreModule,
    SharedModule,
    LayoutModule,
    AuthModule
  ],
  providers: [
    { provide: API_URL, useValue: environment.api }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
