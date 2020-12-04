import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';
import { Account, Currency } from './account.model';
import { Timespan, Transaction } from './transaction.model';
import { Settings } from '../../../shared/shared.settings';
import { AccountModule } from '../account.module';


@Injectable({
  providedIn: AccountModule
})
export class AccountService {

  constructor(private dbService: NgxIndexedDBService) { }

  createAccount(name: string, currency: Currency): Observable<number> {
    let account = {
      name: name,
      currency: currency
    };

    return this.dbService.add(Settings.DB_ACCOUNT_STORE, account);
  }

  getAccounts(): Observable<Account[]> {
    return this.dbService.getAll(Settings.DB_ACCOUNT_STORE);
  }

  getAccount(id: number): Observable<Account> {
    return this.dbService.getByID(Settings.DB_ACCOUNT_STORE, id) 
  }

  createTransaction(
    account: number, name: string, amount: number, date: Date, recurrence: Timespan): Observable<number> {
    let transaction: Transaction = {
      id: 0,
      name: name,
      account: account,
      amount: amount,
      date: date,
      recurrence: recurrence
    }
    
    delete transaction.id;

    return this.dbService.add(Settings.DB_TRANSACTION_STORE, transaction);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.dbService.getAll(Settings.DB_TRANSACTION_STORE);
  }

  getTransaction(id: number): Observable<Transaction> {
    return this.dbService.getByID(Settings.DB_TRANSACTION_STORE, id) 
  }

  getTransactionsForAccount(accountId: number): Observable<Transaction[]> {
    return this.dbService.getAllByIndex(
      Settings.DB_TRANSACTION_STORE, 
      Settings.DB_TRANSACTION_ACCOUNT_INDEX, 
      IDBKeyRange.only(accountId)); 
  }
}
