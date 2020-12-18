import { Component, Input, OnInit } from '@angular/core';
import { Account, Currency } from '../shared/account.model';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  private _account: Account;
  
  @Input() set account(account: Account) {
    this._account = account;
  }
  get account(): Account {
    return this._account;
  }
  
  // currency array for select drop down
  currencies = Currency;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
