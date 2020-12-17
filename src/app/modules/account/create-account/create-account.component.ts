import { Component, Input, OnInit } from '@angular/core';
import { Currency } from '../shared/account.model';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  @Input() title: string = "Account";

  currencies = Currency;
  selectedCurrency: Currency;

  constructor() { }

  ngOnInit(): void {
  }

  onCreate(): void {

  }

}
