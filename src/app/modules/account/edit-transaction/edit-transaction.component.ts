import { Component, Input, OnInit } from '@angular/core';
import { Currency } from '../shared/account.model';
import { AccountService } from '../shared/account.service';
import { CurrencyToNumberPipe } from '../shared/currency-to-number.pipe';
import { Timespan, Transaction } from '../shared/transaction.model';
import { getCurrencyType } from '../shared/utility';

@Component({
  selector: 'app-edit-transaction',
  templateUrl: './edit-transaction.component.html',
  styleUrls: ['./edit-transaction.component.css']
})
export class EditTransactionComponent implements OnInit {
  private _transaction: Transaction;
  
  @Input() currency: Currency;
  @Input() set transaction(transaction: Transaction) {
    this._transaction = transaction;
    this.amount = transaction.amount.toString();
  }
  get transaction(): Transaction {
    return this._transaction;
  }

  amount: string = "";
  timespans = Timespan;


  constructor(
    private currencyToNumber: CurrencyToNumberPipe,
    private accountService: AccountService) { }

  ngOnInit(): void {
  }

  getCurrencyType(): string {
    return getCurrencyType(this.currency);
  }

  changeAmount(newAmount: string): void {
    this.amount = newAmount;
    if (this._transaction)
      this._transaction.amount = this.currencyToNumber.transform(newAmount);
  }

  onSubmit(): void {
    if (this._transaction) {
      this.accountService.editTransaction(this._transaction)
        .subscribe((data) => {}, error => console.log(error))
        // TODO add logger
    }
  }
}
