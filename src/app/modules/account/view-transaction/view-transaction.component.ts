import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '../shared/transaction.model';
import { Currency } from '../shared/account.model';
import { getAmountString } from '../shared/utility';

@Component({
  selector: 'app-view-transaction',
  templateUrl: './view-transaction.component.html',
  styleUrls: ['./view-transaction.component.css']
})
export class ViewTransactionComponent implements OnInit {
  @Input() transaction: Transaction;
  @Input() currency: Currency = Currency.USD;

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {

  }

  getNameString(): string {
    if (!this.transaction)
      return 'Transaction Placeholder';
    return this.transaction.name;
  }

  getDateString(): string {
    if (!this.transaction)
      return "12/11/2020";
    return this.transaction.date.toLocaleDateString();
  }
  
  getAmountString(): string {
    if (!this.transaction)
      return '$100.00';
    return getAmountString(this.transaction.amount, this.currency);
  }
}
