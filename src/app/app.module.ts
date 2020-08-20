import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { SharedModule } from "@shared/shared.module";
import { API_PROVIDER } from "@core/configs";

import { AppRoutingModule } from './app-routing.module';
import { RootStoreModule } from '@store/root-store.module';
import { LayoutModule } from '@layout/layout.module';
import { CoreModule } from '@core/core.module';


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
    CoreModule,
  ],
  providers: [
    API_PROVIDER
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
