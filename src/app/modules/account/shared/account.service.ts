import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable, of } from 'rxjs';
import { Account, Currency } from './account.model';
import { Timespan, Transaction } from './transaction.model';
import { Settings } from '../../../shared/shared.settings';
import { mergeMap } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
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
   * Get all transactions up to the date for the specified account
   * @param accountId database key of the account
   * @param date get transactions up to this date
   */
  getAccountTransactionsOnDate(accountId: number, date: Date) : Observable<Transaction[]> {
    return this.getTransactionsForAccount(accountId)
      .pipe(
        mergeMap((transactions: Transaction[]) => {
          let accountTransactions: Transaction[] = []
          
          transactions = transactions.filter((trans) => trans.date < date);
          
          transactions.forEach((trans, index) => {
            // If single transaction, add balance and continue
            if (trans.recurrence === Timespan.Once) {
              accountTransactions.push(trans);
              return;
            }   

            let numOccurance = 1;
            let momentDate = moment(date);
            switch (trans.recurrence) {
              case Timespan.Daily:
                numOccurance += momentDate.diff(trans.date, 'days');
                break;
              case Timespan.Weekly:
                numOccurance += momentDate.diff(trans.date, 'weeks');
                break;
              case Timespan.Biweekly:
                numOccurance += Math.floor(momentDate.diff(trans.date, 'weeks') / 2);
                break;
              case Timespan.Monthly:
                numOccurance += momentDate.diff(trans.date, 'months');
                break;
              case Timespan.HalfYear:
                numOccurance += Math.floor(momentDate.diff(trans.date, 'months') / 6);
                break;
              case Timespan.Yearly:
                numOccurance += momentDate.diff(trans.date, 'years');
                break;
            }

            let occurances: Transaction[] = new Array(numOccurance).fill(trans);
            for (let i=0; i<occurances.length; i++) {
              switch (occurances[i].recurrence) {
                case Timespan.Daily:
                  occurances[i].date = moment(occurances[i].date).add(i, 'days').toDate();
                  break;
                case Timespan.Weekly:
                  occurances[i].date = moment(occurances[i].date).add(i, 'weeks').toDate();
                  break;
                case Timespan.Biweekly:
                  occurances[i].date = moment(occurances[i].date).add(i * 2, 'weeks').toDate();
                  break;
                case Timespan.Monthly:
                  occurances[i].date = moment(occurances[i].date).add(i, 'months').toDate();
                  break;
                case Timespan.HalfYear:
                  occurances[i].date = moment(occurances[i].date).add(i*6, 'months').toDate();
                  break;
                case Timespan.Yearly:
                  occurances[i].date = moment(occurances[i].date).add(i, 'years').toDate();
                  break;
              }
            }
            accountTransactions = accountTransactions.concat(occurances);
        })

        return of(accountTransactions.sort((a : Transaction, b : Transaction) => a.date.getTime() - b.date.getTime()))
      })
    )
  }

  /**
   * Get the predicted account balance on the specified date
   * @param accountId database key of the account
   * @param date get account balance on this date
   */
  async getAccountBalanceOnDate(accountId: number, date: Date) : Promise<number> {
    let transactionsOnDate = await this.getAccountTransactionsOnDate(accountId, date).toPromise();

    return transactionsOnDate.reduce((a, b) => a + (b.amount), 0);
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
