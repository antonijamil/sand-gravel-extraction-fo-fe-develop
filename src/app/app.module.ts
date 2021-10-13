import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {CoreModule} from '@core/core.module';
import {SharedModule} from '@shared/shared.module';
import {APP_ROUTES} from '@app/app.routes';
import {ConfigProvider, initConfig} from '@bang/common';
import {BaNgAuthenticationModule, OauthInterceptor} from '@bang/auth';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ListViewCaptainComponent} from '@features/list-view/pages/list-view-captain/list-view-captain.component';
import {CommonModule, DatePipe} from '@angular/common';
import {HttpInterceptorService} from '@core/http/http-interceptor.service';


export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    {prefix: './assets/i18n/', suffix: '.json'},
    {prefix: './assets/i18n/bang/common/', suffix: '.json'}
  ]);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BaNgAuthenticationModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(APP_ROUTES, {
      scrollPositionRestoration: 'enabled'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }, ),
    /*
    LocalizeRouterModule.forRoot(APP_ROUTES, {
      parser: {
        provide: LocalizeParser,
        useFactory: (translate, location, settings) =>
          new ManualParserLoader(translate, location, settings, ['nl', 'fr']),
        deps: [TranslateService, Location, LocalizeRouterSettings]
      }
    }),*/
    CoreModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigProvider],
      multi: true
    },
    /*{
      provide: HTTP_INTERCEPTORS,
      useClass: OauthInterceptor,
      multi: true
    },*/
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
