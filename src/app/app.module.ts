import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoggerModule } from 'ngx-logger';

import { environment } from 'src/environments/environment'
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AccountModule } from './modules/account/account.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoggerModule.forRoot({
      serverLogLevel: environment.serverLogLevel,
      level: environment.logLevel,
      disableConsoleLogging: false
    }),
    CoreModule,
    AccountModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
