import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from "ngx-toastr";
import { ErrorInterceptorProvider } from "./interceptors/error.interceptor";
import { AuthInterceptorProvider } from "./interceptors/auth.interceptor";
import { RouterModule } from "@angular/router";
import { LocalStorageService } from "@core/services/local-storage.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    RouterModule
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only!');
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ErrorInterceptorProvider,
        AuthInterceptorProvider,
        LocalStorageService
      ]
    };
  }
}
