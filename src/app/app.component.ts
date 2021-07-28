import { Component, OnInit } from '@angular/core';
import { Account, Currency } from './modules/account/shared/account.model';
import { ResponsiveService } from './shared/responsive.service';
import { registerLocaleData } from '@angular/common';
import localeEN from '@angular/common/locales/en';
import localeJP from '@angular/common/locales/ja';
import localeGBExtra from '@angular/common/locales/extra/en-GB';
import localeJPExtra from '@angular/common/locales/extra/ja';
import localeENExtra from '@angular/common/locales/extra/en';
import localeCAExtra from '@angular/common/locales/extra/en-CA';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Finance';
  account: Account = {
    id: 0,
    name: 'My Account Name',
    currency: Currency.CAD
  }

  constructor(private responsiveService: ResponsiveService) {}

  ngOnInit() {
    this.onResize();
    
    registerLocaleData(localeJP, 'ja', localeJPExtra);
    registerLocaleData(localeJP, 'ja-JP', localeJPExtra);
    registerLocaleData(localeEN, 'en-GB', localeGBExtra);
    registerLocaleData(localeEN, 'en-US', localeENExtra);
    registerLocaleData(localeEN, 'en-CA', localeCAExtra);
  }

  onResize() {
    this.responsiveService.checkWidth();
  }
}
