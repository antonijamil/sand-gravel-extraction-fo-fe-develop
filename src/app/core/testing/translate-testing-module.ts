import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';

export const TranslateTestingModule = TranslateModule.forRoot({
  loader: {
    provide: TranslateLoader,
    useFactory: (http: HttpClient) => new MultiTranslateHttpLoader(http, [
      {prefix: './assets/i18n/', suffix: '.json'},
      {prefix: './assets/i18n/bang/common/', suffix: '.json'}
    ]),
    deps: [HttpClient]
  }
});
