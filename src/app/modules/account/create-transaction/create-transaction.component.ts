import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Currency } from '../shared/account.model';
import { AccountService } from '../shared/account.service';
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

  @Output() create = new EventEmitter<CreateTransaction>();
  @Output() amountChange = new EventEmitter<number>();
  
  // Properties
  private _title: string = "Create Transaction";
  @Input() set title(title: string) {
    this._title = title;
  }
  get title(): string {
    return this._title;
  }

  private _name: string;
  @Input() set name(name: string) {
    this._name = name;
    this.transactionForm.patchValue({ 'name': this._name })
  }
  get name(): string {
    return this._name;
  }

  private _amount: string = "";
  @Input() set amount(amount: string) {
    this._amount = amount;
    this.transactionForm.patchValue({ 'amount': this._amount });
    this.amountChange.emit(this.currencyToNumber.transform(this._amount));
  }
  get amount(): string {
    return this._amount;
  }

  private _date: Date;
  @Input() set date(date: Date) {
    this._date = date;
    this.transactionForm.patchValue({ 'date': this._date })
  }
  get date(): Date {
    return this._date;
  }

  private _selectedTimespan: Timespan;
  @Input() set selectedTimespan(timespan: Timespan) {
    this._selectedTimespan = timespan;
    this.transactionForm.patchValue({ 'recurrence': this._selectedTimespan })
  }
  get selectedTimespan(): Timespan {
    return this._selectedTimespan;
  }

  timespans = Timespan;

  // Form Controls
  transactionForm = new FormGroup({
    name: new FormControl(this.name, [Validators.required]),
    amount: new FormControl(this.amount, [Validators.required]),
    date: new FormControl(this.date, [Validators.required]),
    recurrence: new FormControl(this.selectedTimespan, [Validators.required])
  });


  constructor(
    private currencyToNumber: CurrencyToNumberPipe) { }

  ngOnInit(): void {
  }

  getCurrencyType(): string {
    return getCurrencyType(this.currency);
  }

  onCreate(form: FormGroup): void {
    if (this.transactionForm.invalid) return;

    const transaction: CreateTransaction = {
      name: form.value.name,
      amount: this.currencyToNumber.transform(form.value.amount),
      recurrence: form.value.recurrence,
      date: form.value.date
    };

    this.create.emit(transaction);
  }
}
