import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { RootStoreModule } from '@store/root-store.module';
import { LayoutModule } from '@layout/layout.module';
import { CoreModule } from '@core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RootStoreModule,
    LayoutModule,
    CoreModule.forRoot(),
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
