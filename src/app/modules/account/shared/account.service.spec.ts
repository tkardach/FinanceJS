import { TestBed } from '@angular/core/testing';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountService } from './account.service';
import { Settings } from '../../../shared/shared.settings';
import { Currency } from './account.model';
import { AccountModule } from '../account.module';
import { Timespan } from './transaction.model';

describe('AccountService', () => {
  let service: AccountService;
  let dbService: NgxIndexedDBService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [SharedModule, AccountModule],
      providers: [NgxIndexedDBService]
    });
    service = TestBed.inject(AccountService);
    dbService = TestBed.inject(NgxIndexedDBService);

    await dbService.clear(Settings.DB_ACCOUNT_STORE).toPromise();
    await dbService.clear(Settings.DB_TRANSACTION_STORE).toPromise();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create an account', async () => {
    const name = 'accountName';
    const curr = Currency.USD;

    try {
      const key = await service.createAccount(name, curr).toPromise();
      expect(key).toBeGreaterThan(-1);

      const accounts = await service.getAccounts().toPromise();
      expect(accounts.length).toBe(1);

      const account = await service.getAccount(key).toPromise();
      expect(account).toEqual(jasmine.objectContaining({
        name: name,
        currency: curr
      }))
    }
    catch (error) {
      console.error(error);
      expect(false).toBeTruthy();
    }
  });

  it('should get an account by id', async () => {
    const name = 'accountName';
    const curr = Currency.USD;

    try {
      await service.createAccount('first_account', Currency.CAD).toPromise();
      const key = await service.createAccount(name, curr).toPromise();
      expect(key).toBeGreaterThan(-1);

      const accounts = await service.getAccounts().toPromise();
      expect(accounts.length).toBe(2);

      const account = await service.getAccount(key).toPromise();
      expect(account.name).toBe(name);
      expect(account.currency).toBe(curr);
    }
    catch (error) {
      console.error(error);
      expect(false).toBeTruthy();
    }
  });

  it('should get all accounts in database', async () => {
    const name = 'accountName';
    const curr = Currency.USD;

    try {
      await service.createAccount('first_account', Currency.CAD).toPromise();
      await service.createAccount('second_account', Currency.JPY).toPromise();
      const key = await service.createAccount(name, curr).toPromise();
      expect(key).toBeGreaterThan(-1);

      const accounts = await service.getAccounts().toPromise();
      expect(accounts.length).toBe(3);
      expect(accounts).toContain(jasmine.objectContaining({
        id: key,
        name: name,
        currency: curr
      }));
    }
    catch (error) {
      console.error(error);
      expect(false).toBeTruthy();
    }
  });

  it('should create a transaction', async () => {
    const accountName = 'accountName';
    const accountCurrency = Currency.USD;

    const name = 'transactionName';
    const amount = 95.50;
    const date = new Date();
    const recurrence = Timespan.Biweekly;

    try {
      const accountKey = await service.createAccount(accountName, accountCurrency).toPromise();
      expect(accountKey).toBeGreaterThan(-1);

      const key = await service.createTransaction(accountKey, name, amount, date, recurrence).toPromise();;
      expect(key).toBeGreaterThan(-1);
      
      const transactions = await service.getTransactions().toPromise();
      expect(transactions.length).toBe(1);

      const transaction = await service.getTransaction(key).toPromise();
      expect(transaction).toEqual(jasmine.objectContaining({
        name: name,
        amount: amount,
        recurrence: recurrence
      }));
    }
    catch (error) {
      console.error(error);
      expect(false).toBeTruthy();
    }
  });

  it('should get transaction by id', async () => {
    const accountName = 'accountName';
    const accountCurrency = Currency.USD;

    const name = 'transactionName';
    const amount = 95.50;
    const date = new Date();
    const recurrence = Timespan.Biweekly;

    try {
      const otherAccountKey = await service.createAccount('otherAccount', accountCurrency).toPromise();
      const accountKey = await service.createAccount(accountName, accountCurrency).toPromise();
      expect(accountKey).toBeGreaterThan(-1);

      await service.createTransaction(accountKey, 'first_trans', amount, date, recurrence).toPromise();
      await service.createTransaction(otherAccountKey, 'second_trans', amount, date, recurrence).toPromise();
      const key = await service.createTransaction(accountKey, name, amount, date, recurrence).toPromise();
      expect(key).toBeGreaterThan(-1);
      
      const transactions = await service.getTransactions().toPromise();
      expect(transactions.length).toBe(3);

      const transaction = await service.getTransaction(key).toPromise();
      expect(transaction).toEqual(jasmine.objectContaining({
        name: name,
        amount: amount,
        recurrence: recurrence
      }));
    }
    catch (error) {
      console.error(error);
      expect(false).toBeTruthy();
    }
  });

  it('should all transactions in the database', async () => {
    const accountName = 'accountName';
    const accountCurrency = Currency.USD;

    const name = 'transactionName';
    const amount = 95.50;
    const date = new Date();
    const recurrence = Timespan.Biweekly;

    try {
      const otherAccountKey = await service.createAccount('otherAccount', accountCurrency).toPromise();
      const accountKey = await service.createAccount(accountName, accountCurrency).toPromise();
      expect(accountKey).toBeGreaterThan(-1);

      await service.createTransaction(accountKey, 'first_trans', amount, date, recurrence).toPromise();
      await service.createTransaction(otherAccountKey, 'second_trans', amount, date, recurrence).toPromise();
      const key = await service.createTransaction(accountKey, name, amount, date, recurrence).toPromise();
      expect(key).toBeGreaterThan(-1);
      
      const transactions = await service.getTransactions().toPromise();
      expect(transactions.length).toBe(3);
      expect(transactions).toContain(jasmine.objectContaining({
        name: name,
        amount: amount,
        recurrence: recurrence
      }));
    }
    catch (error) {
      console.error(error);
      expect(false).toBeTruthy();
    }
  });

  it('should return all transactions for an account', async () => {
    const accountName = 'accountName';
    const accountCurrency = Currency.USD;

    const name = 'transactionName';
    const amount = 95.50;
    const date = new Date();
    const recurrence = Timespan.Biweekly;

    const secondName = 'secondTransaction';
    const secondAmount = -255.25;
    const secondDate = new Date();
    const secondrecurrence = Timespan.Weekly;

    secondDate.setDate(date.getDate() + 1);

    try {
      const otherAccountKey = await service.createAccount('otherAccount', accountCurrency).toPromise();
      const accountKey = await service.createAccount(accountName, accountCurrency).toPromise();
      expect(accountKey).toBeGreaterThan(-1);

      await service.createTransaction(otherAccountKey, 'first_trans', amount, date, recurrence).toPromise();
      await service.createTransaction(otherAccountKey, 'second_trans', amount, date, recurrence).toPromise();
      const key = await service.createTransaction(accountKey, name, amount, date, recurrence).toPromise();
      const secondKey = await service.createTransaction(accountKey, secondName, secondAmount, secondDate, secondrecurrence).toPromise();
      expect(key).toBeGreaterThan(-1);
      expect(secondKey).toBeGreaterThan(-1);
      
      const transactions = await service.getTransactions().toPromise();
      expect(transactions.length).toBe(4);
      
      const accountTransactions = await service.getTransactionsForAccount(accountKey).toPromise();
      expect(accountTransactions.length).toBe(2);

      expect(accountTransactions).toContain(jasmine.objectContaining({
        name: name,
        amount: amount,
        recurrence: recurrence
      }));
      expect(accountTransactions).toContain(jasmine.objectContaining({
        name: secondName,
        amount: secondAmount,
        recurrence: secondrecurrence
      }));
    }
    catch (error) {
      console.error(error);
      expect(false).toBeTruthy();
    }
  });
});
