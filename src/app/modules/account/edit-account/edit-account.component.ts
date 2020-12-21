import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Account, Currency } from '../shared/account.model';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {
  
  @Output() edit = new EventEmitter<Account>();
  
  // Properties
  private _account: Account;
  @Input() set account(account: Account) {
    this._account = account;

    if (!account) return;
    this.name = account.name;
    this.currency = account.currency;
  }
  get account(): Account {
    return this._account;
  }
  
  private _name: string;
  @Input() set name(name: string) {
    this._name = name;
    this.accountForm.patchValue({ 'name': this._name })
  }
  get name(): string {
    return this._name;
  }
  
  private _currency: Currency;
  @Input() set currency(currency: Currency) {
    this._currency = currency;
    this.accountForm.patchValue({ 'currency': this._currency })
  }
  get currency(): Currency {
    return this._currency;
  }

  // currency array for select drop down
  currencies = Currency;

  // Form Controls
  accountForm = new FormGroup({
    name: new FormControl(this.name, [Validators.required]),
    currency: new FormControl(this.currency, [Validators.required])
  });

  
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: FormGroup): void {
    if (this.accountForm.invalid) return;

    const editAccount: Account = {
      id: this.account.id,
      name: form.value.name,
      currency: form.value.currency
    };

    this.edit.emit(editAccount);
  }
}
