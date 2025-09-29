import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
      //     {
      //   provide: APP_BASE_HREF,
      //   useValue: window.__POWERED_BY_QIANKUN__ ? '/app-angular' : '/'
      // },
      // {
      //   provide: 'qiankunProps',
      //   useValue: props
      // }
  ]
};
