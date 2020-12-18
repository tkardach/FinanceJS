import { Component, OnInit } from '@angular/core';
import { Account, Currency } from './modules/account/shared/account.model';
import { ResponsiveService } from './shared/responsive.service';

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
  }

  onResize() {
    this.responsiveService.checkWidth();
  }
}
