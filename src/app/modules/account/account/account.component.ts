import { Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Account, Currency } from '../shared/account.model';
import { getCurrencyString } from '../shared/utility';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  private _account: Account;
  
  @Input() set account(account: Account) {
    this._account = account;
  }
  get account(): Account {
    return this._account;
  }
  
  @Output() click: EventEmitter<Account> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(event: MouseEvent): void {
    event.stopPropagation();
    this.click.emit(this._account);
  }

  getAccountName(): string {
    return this._account ? this._account.name : "Placeholder Account Name";
  }

  getCurrencyString(): string {
    return this._account ? getCurrencyString(this._account.currency) : getCurrencyString(Currency.USD);
  }
}
