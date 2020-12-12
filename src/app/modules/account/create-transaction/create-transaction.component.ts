import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Currency } from '../shared/account.model';
import { CurrencyToNumberPipe } from '../shared/currency-to-number.pipe';
import { CreateTransaction, Timespan } from '../shared/transaction.model';
import { getCurrencyType } from '../shared/utility';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent implements OnInit {
  @Input() currency: Currency;
  @Output() created = new EventEmitter<CreateTransaction>();
  
  name: string;
  amount: string = "";
  date: Date;
  selectedTimespan: Timespan;
  timespans = Timespan;

  constructor(private currencyToNumber: CurrencyToNumberPipe) { }

  ngOnInit(): void {
  }

  getCurrencyType(): string {
    return getCurrencyType(this.currency);
  }

  onCreate(): void {
    const transaction: CreateTransaction = {
      name: this.name,
      amount: this.currencyToNumber.transform(this.amount),
      recurrence: this.selectedTimespan,
      date: this.date
    };

    console.log(transaction);
    this.created.emit(transaction);
  }
}
