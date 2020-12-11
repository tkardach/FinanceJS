import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Account } from '../shared/account.model';
import { AccountService } from '../shared/account.service';
import { getAmountString } from '../shared/utility';

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.css']
})
export class AccountBalanceComponent implements OnInit {
  private _account: Account;
  private _balance: number = 0;
  private _date: Date = new Date();

  @Input() set account(account: Account) {
    this._account = account;
    this.reloadAccount();
  };
  get account(): Account {
    return this._account;
  }

  @Input() set date(date: Date) {
    this._date = date;
    this.reloadAccount();
  }

  get date(): Date {
    return this._date;
  }
  
  @Output() click: EventEmitter<Account> = new EventEmitter();

  
  constructor(private accountService: AccountService, private logger: NGXLogger) { }

  ngOnInit(): void {
  }

  onClick(event: MouseEvent) {
    event.stopPropagation();
    this.click.emit(this.account);
  }

  reloadAccount(): void {
    if (!this.account)
      return;
    
    this.accountService.getAccountBalanceOnDate(this.account.id, this.date)
      .then((balance) => this._balance = balance)
      .catch((reason) => this.logger.log(reason));
  }

  getAccountName(): string {
    return this.account ? this.account.name : "Placeholder Name";
  }

  getAccountBalance(): string {
    return this.account ? getAmountString(this._balance, this.account.currency) : "$100.00";
  }
}
