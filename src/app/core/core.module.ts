import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptorProvider } from '@core/interceptors/error.interceptor';
import { AuthInterceptorProvider } from '@core/interceptors/auth.interceptor';


@NgModule({
  imports: [
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
  ]
})

export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only!');
    }
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ErrorInterceptorProvider,
        AuthInterceptorProvider,
        // { provide: ErrorHandler, useClass: MyErrorHandler }
      ]
    };
  }

}
