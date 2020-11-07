import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InterceptorService } from './api/services/interceptior.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), HttpClientModule,AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptorService,
        multi: true
      },
      {
        provide: LOCALE_ID,
        useValue: 'pt'
      },
      {
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
