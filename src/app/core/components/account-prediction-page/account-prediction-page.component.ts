import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/modules/account/shared/account.model';
import { AccountService } from 'src/app/modules/account/shared/account.service';
import { Transaction } from 'src/app/modules/account/shared/transaction.model';
import { ConfigurationService } from 'src/app/modules/configuration/configuration.service';
import { ResponsiveService } from 'src/app/shared/responsive.service';

@Component({
  selector: 'app-account-prediction-page',
  templateUrl: './account-prediction-page.component.html',
  styleUrls: ['./account-prediction-page.component.css']
})
export class AccountPredictionPageComponent implements OnInit {
  isMobile: boolean;
  transactions: Transaction[];
  account: Account;

  private _selectedDate = new Date();
  @Input() set selectedDate(date: Date) {
    this._selectedDate = date;
    this.onDateChange();
  }
  get selectedDate(): Date {
    return this._selectedDate;
  }

  constructor(
    private configurationService: ConfigurationService,
    private responsiveService: ResponsiveService,
    private accountService: AccountService,
    private router: Router) { }

  ngOnInit(): void {
    const id = this.configurationService.currentAccount;
    if (id !== -1) {
      this.accountService.getAccount(id).subscribe(account => {
        this.account = account;
        this.onDateChange();
      }, error => {
        // TODO handle error
      });
    }
    this.onResize();
  }

  onResize() {
    this.responsiveService.getMobileStatus().subscribe(isMobile => {
      this.isMobile = isMobile
    });
  }

  onDateChange() {
    if (this.account) {
      this.accountService.getAccountTransactionsOnDate(this.account.id, this.selectedDate).subscribe(transactions => {
        this.transactions = transactions;
      }, error => {
        // TODO handle error
      })
    }
  }

  onEditTransaction(transaction: Transaction) {
    
  }

  onEditAccount(account: Account) {
    this.router.navigate(['/account'])
  }
}
