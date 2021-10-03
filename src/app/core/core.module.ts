import {ErrorHandler, Injector, NgModule, Optional, SkipSelf} from '@angular/core';
import {GlobalErrorHandler} from '@bang/common';
import {appRoutesLinks} from '@app/app.routes.links';
import {MessageService} from 'primeng';

export function GlobalErrorHandlerFactory(injector: Injector) {
  return new GlobalErrorHandler(injector, appRoutesLinks.ERROR);
}

@NgModule({
  providers: [
    MessageService,
    {
      provide: ErrorHandler,
      useFactory: GlobalErrorHandlerFactory,
      deps: [Injector]
    }
  ],
  declarations: []

})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
