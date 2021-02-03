import { EventEmitter } from '@angular/core';
import { Component, HostListener, Input, OnInit, Output } from '@angular/core';
import { Currency } from '../shared/account.model';
import { Transaction } from '../shared/transaction.model';
import { getAmountString } from '../shared/utility';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  @Input() editMode: boolean = false;
  @Input() isSelected: boolean = false;

  @Input() transaction: Transaction;
  @Input() currency: Currency = Currency.USD;

  @Output() public click = new EventEmitter<Transaction>();

  constructor() { }

  ngOnInit(): void {
  }
  
  onClick(event: MouseEvent) {
    event.stopPropagation();
    this.click.emit(this.transaction);
  }

  getNameString(): string {
    if (!this.transaction)
      return 'Transaction Placeholder';
    return this.transaction.name;
  }

  getAmountString(): string {
    if (!this.transaction)
      return '$100.00';
    return getAmountString(this.transaction.amount, this.currency);
  }
}
