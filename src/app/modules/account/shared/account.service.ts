import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, of, Subject, forkJoin } from 'rxjs';
import { Account, Currency } from './account.model';
import { Timespan, Transaction } from './transaction.model';
import { Settings } from '../../../shared/shared.settings';
import { AccountModule } from '../account.module';
import { mergeMap } from 'rxjs/operators'

@Injectable({
  providedIn: AccountModule
})
export class AccountService {

  constructor(private dbService: NgxIndexedDBService) { }

  /**
   * Creates an account in the database
   * @param name name of the account
   * @param currency currency type of the account
   * @returns Observable<number> representing the database key of the created account
   */
  createAccount(name: string, currency: Currency): Observable<number> {
    let account: Account = {
      id: 0,
      name: name,
      currency: currency
    };
    delete account.id;

    return this.dbService.add(Settings.DB_ACCOUNT_STORE, account);
  }

  /**
   * Get all accounts in the database
   * @returns Observable<Account[]> an array of all accounts in database
   */
  getAccounts(): Observable<Account[]> {
    return this.dbService.getAll(Settings.DB_ACCOUNT_STORE);
  }

  /**
   * Return the account specified by the given id
   * @param id database key of the account
   */
  getAccount(id: number): Observable<Account> {
    return this.dbService.getByID(Settings.DB_ACCOUNT_STORE, id) 
  }

  /**
   * Create a transaction in the database for the given account
   * @param account account key
   * @param name name of the transaction
   * @param amount amount of the transaction
   * @param date date of the transaction
   * @param recurrence how frequently the transasction should occur
   * @returns Observable<number> representing the database key of the created transaction
   */
  createTransaction(
    account: number, name: string, amount: number, date: Date, recurrence: Timespan): Observable<number> {
    return this.getAccount(account)
      .pipe(
        mergeMap((value: Account, index: number) => {
          if (!value)
            return of(undefined);
          
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
        })
      )
  }

  /**
   * Get all transactions in the database
   * @returns Observable<Transaction[]> all transactions in the database
   */
  getTransactions(): Observable<Transaction[]> {
    return this.dbService.getAll(Settings.DB_TRANSACTION_STORE);
  }

  /**
   * Get transaction by its database key
   * @param id database key of the transaction
   */
  getTransaction(id: number): Observable<Transaction> {
    return this.dbService.getByID(Settings.DB_TRANSACTION_STORE, id) 
  }

  /**
   * Get all transactions for the given account
   * @param accountId database key of the account
   */
  getTransactionsForAccount(accountId: number): Observable<Transaction[]> {
    return this.dbService.getAllByIndex(
      Settings.DB_TRANSACTION_STORE, 
      Settings.DB_TRANSACTION_ACCOUNT_INDEX, 
      IDBKeyRange.only(accountId)); 
  }
}
