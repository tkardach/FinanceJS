import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggerModule } from 'ngx-logger';
import { environment } from 'src/environments/environment'
import { CoreModule } from './core/core.module';
import { AccountModule } from './modules/account/account.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    LoggerModule.forRoot({
      serverLogLevel: environment.serverLogLevel,
      level: environment.logLevel,
      disableConsoleLogging: false
    }),
    CoreModule,
    AccountModule,
    MatDialogModule
  ],
  providers: [
    HttpClient,
    {
      provide: MatDialogRef,
      useValue: {}
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
