import { NgxHowlerService } from 'ngx-howler';
import { ToastrModule } from 'ngx-toastr';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      positionClass :'toast-bottom-right',
      newestOnTop: true,
      tapToDismiss: true,
      autoDismiss: true,
      maxOpened: 4,
      timeOut: 1000
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'ar',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    SocketIoModule.forRoot(config)
  ],
  providers: [HttpClient, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptor,
    multi: true
  }, NgxHowlerService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(howler: NgxHowlerService){
    howler.loadScript('https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.0/howler.min.js');
  }
}
