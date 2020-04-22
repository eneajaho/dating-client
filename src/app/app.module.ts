import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { HttpClientModule } from "@angular/common/http";
import { environment } from "../environments/environment";
import { API_URL } from "./core/configs/api.token";

import { AppRoutingModule } from './app-routing.module';
import { RootStoreModule } from './root-store';
import { LayoutModule } from './layout/layout.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RootStoreModule,
    SharedModule,
    LayoutModule,
    CoreModule.forRoot(),
  ],
  providers: [
    { provide: API_URL, useValue: environment.api },
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
