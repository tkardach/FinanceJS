import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Currency, CreateAccount } from '../shared/account.model';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  // Inputs
  @Input() name: string;
  @Input() selectedCurrency: Currency;
  @Input() title: string = "Create Account";

  @Output() create = new EventEmitter<CreateAccount>();

  // currency array for select drop down
  currencies = Currency;
  

  constructor() { }

  ngOnInit(): void {
  }

  onCreate(): void {
    const account: CreateAccount = {
      name: this.name,
      currency: this.selectedCurrency
    }

    this.create.emit(account);
  }

}
