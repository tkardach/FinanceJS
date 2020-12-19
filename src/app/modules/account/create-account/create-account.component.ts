import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Currency, CreateAccount } from '../shared/account.model';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  // Inputs
  @Input() title: string = "Create Account";

  // Properties
  private _name: string;
  @Input() set name(name: string) {
    this._name = name;
    this.createAccount.patchValue({ 'name': this._name })
  }
  get name(): string {
    return this._name;
  }
  
  private _selectedCurrency: Currency;
  @Input() set selectedCurrency(currency: Currency) {
    this._selectedCurrency = currency;
    this.createAccount.patchValue({ 'currency': this._selectedCurrency })
  }
  get selectedCurrency(): Currency {
    return this._selectedCurrency;
  }

  @Output() create = new EventEmitter<CreateAccount>();

  // Form Controls
  createAccount = new FormGroup({
    name: new FormControl(this.name, [Validators.required]),
    currency: new FormControl(this.selectedCurrency, [Validators.required])
  });

  // currency array for select drop down
  currencies = Currency;
  

  constructor() { }

  ngOnInit(): void {
  }

  onCreate(form: FormGroup): void {
    if (this.createAccount.invalid) return;

    const account: CreateAccount = {
      name: form.value.name,
      currency: form.value.currency
    }

    this.create.emit(account);
  }

}
