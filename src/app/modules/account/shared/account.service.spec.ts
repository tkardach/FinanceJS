import { TestBed } from '@angular/core/testing';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountService } from './account.service';
import { Settings } from '../../../shared/shared.settings';
import { Currency } from './account.model';
import { AccountModule } from '../account.module';
import { Timespan } from './transaction.model';
import * as moment from 'moment';

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

  describe('createAccount()', () => {
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
  });
  
  describe('getAccount(id)', () => {
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

    it('should get undefined for account by id that does not exist', async () => {
      try {
        const account = await service.getAccount(0).toPromise();
        expect(account).toBe(undefined);
      }
      catch (error) {
        console.error(error);
        expect(false).toBeTruthy();
      }
    });

  });
  
  describe('getAccounts()', () => {
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
  });
  
  describe('createTransaction()', () => {
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
  
        const key = await service.createTransaction(accountKey, name, amount, date, recurrence).toPromise();
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
  
    it('should return undefined when creating transaction for account that does not exist', async () => {
      const name = 'transactionName';
      const amount = 95.50;
      const date = new Date();
      const recurrence = Timespan.Biweekly;
  
      try {
        const key = await service.createTransaction(0, name, amount, date, recurrence).toPromise();
        expect(false).toBeTruthy();
      }
      catch (error) {
        expect(true).toBeTruthy();
      }
    });  
  });

  describe('getTransaction(id)', () => {
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
  
    it('should return undefined when getting transaction that does not exist', async () => {
      const accountName = 'accountName';
      const accountCurrency = Currency.USD;
  
      try {
        const accountKey = await service.createAccount(accountName, accountCurrency).toPromise();
        expect(accountKey).toBeGreaterThan(-1);
  
        const transaction = await service.getTransaction(0).toPromise();
        expect(transaction).toBe(undefined);
      }
      catch (error) {
        console.error(error);
        expect(false).toBeTruthy();
      }
    });  
  });
  
  describe('getTransactions()', () => {
    it('should return all transactions in the database', async () => {
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
  });
  
  describe('getTransactions(accountId)', () => {
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
  
  describe('deleteTransactions()', () => {
    it('should return delete all transactions listed and return remaining', async () => {
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
  
        const ids = [];

        ids.push(await service.createTransaction(accountKey, 'first_trans_1', amount, date, recurrence).toPromise());
        ids.push(await service.createTransaction(accountKey, 'second_trans_1', amount, date, recurrence).toPromise());
        await service.createTransaction(accountKey, 'third_trans_1', amount, date, recurrence).toPromise();
        ids.push(await service.createTransaction(otherAccountKey, 'first_trans_2', amount, date, recurrence).toPromise());
        ids.push(await service.createTransaction(otherAccountKey, 'second_trans_2', amount, date, recurrence).toPromise());
        await service.createTransaction(otherAccountKey, 'third_trans_2', amount, date, recurrence).toPromise();
        
        const transactions = await service.getTransactions().toPromise();
        expect(transactions.length).toBe(6);

        const remaining_transactions = await service.deleteTransactions(ids).toPromise();
        expect(remaining_transactions.length).toBe(2);
        expect(remaining_transactions).toContain(jasmine.objectContaining({
          name: 'third_trans_2'
        }))
        expect(remaining_transactions).toContain(jasmine.objectContaining({
          name: 'third_trans_1'
        }))
      }
      catch (error) {
        console.error(error);
        expect(false).toBeTruthy();
      }
    });  
  });

  describe('getAccountTransactionsOnDate(accountId, date)', () => {
    it('should return all transactions for an account up to a specified date', async () => {
      const accountName = 'accountName';
      const accountCurrency = Currency.USD;
  
      const name = 'transactionName';
      const amount = 95.50;
      const date = new Date();
      const recurrence = Timespan.Biweekly;
  
      const secondName = 'secondTransaction';
      const secondAmount = -255.25;
      const secondDate = new Date(date);
      const secondrecurrence = Timespan.Weekly;
  
      const targetDate = moment(new Date(date)).add(3, 'weeks');
      
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
        
        const transactionsUpToDate = await service.getAccountTransactionsOnDate(accountKey, targetDate.toDate()).toPromise();
        expect(transactionsUpToDate.length).toBe(6); // 2 transactions (on creation), 1 per week (3 weeks), 1 bi weekly
        expect(transactionsUpToDate[2].recurrence).toBe(secondrecurrence);
      }
      catch (error) {
        console.error(error);
        expect(false).toBeTruthy();
      }
    });
    
    it('should return empty list for account that does not exist', async () => {
      const accountName = 'accountName';
      const accountCurrency = Currency.USD;
  
      const name = 'transactionName';
      const amount = 95.50;
      const date = new Date();
      const recurrence = Timespan.Biweekly;
  
      const targetDate = moment(new Date(date)).add(3, 'weeks');
      
      try {
        const accountKey = await service.createAccount(accountName, accountCurrency).toPromise();
        expect(accountKey).toBeGreaterThan(-1);
  
        const key = await service.createTransaction(accountKey, name, amount, date, recurrence).toPromise();
  
        expect(key).toBeGreaterThan(-1);
        
        const result = await service.getAccountTransactionsOnDate(0, targetDate.toDate()).toPromise();
        expect(result.length).toBe(0);
      }
      catch (error) {
        console.error(error);
        expect(false).toBeTruthy();
      }
    });
  });

  describe('getAccountBalanceOnDate(accountId, date)', () => {
    it('should return the correct sum of all transactions up to the specified date', async () => {
      const accountName = 'accountName';
      const accountCurrency = Currency.USD;
  
      const name = 'transactionName';
      const amount = 95.50;
      const date = new Date();
      const recurrence = Timespan.Biweekly;
  
      const secondName = 'secondTransaction';
      const secondAmount = -255.25;
      const secondDate = new Date(date);
      const secondrecurrence = Timespan.Weekly;
  
      const targetDate = moment(new Date(date)).add(3, 'weeks');
      
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
        
        const balance = await service.getAccountBalanceOnDate(accountKey, targetDate.toDate());
        const expectedBalance = amount * 2 + secondAmount * 4; 
        expect(balance).toBe(expectedBalance); // 2 transactions (on creation), 1 per week (3 weeks), 1 bi weekly
      }
      catch (error) {
        console.error(error);
        expect(false).toBeTruthy();
      }
    });
    
    it('should return 0 if there are no transactions', async () => {
      const accountName = 'accountName';
      const accountCurrency = Currency.USD;
  
      const amount = 95.50;
      const date = new Date();
      const recurrence = Timespan.Biweekly;
  
      const targetDate = moment(new Date(date)).add(3, 'weeks');
      
      try {
        const otherAccountKey = await service.createAccount('otherAccount', accountCurrency).toPromise();
        const accountKey = await service.createAccount(accountName, accountCurrency).toPromise();
        expect(accountKey).toBeGreaterThan(-1);
  
        await service.createTransaction(otherAccountKey, 'first_trans', amount, date, recurrence).toPromise();
        await service.createTransaction(otherAccountKey, 'second_trans', amount, date, recurrence).toPromise();
        
        const balance = await service.getAccountBalanceOnDate(accountKey, targetDate.toDate());
        expect(balance).toBe(0); 
      }
      catch (error) {
        console.error(error);
        expect(false).toBeTruthy();
      }
    });
    
    it('should return 0 if there is no account', async () => {
      const date = new Date()
      const targetDate = moment(new Date(date)).add(3, 'weeks');
      
      try {
        const balance = await service.getAccountBalanceOnDate(0, targetDate.toDate());
        expect(balance).toBe(0); 
      }
      catch (error) {
        console.error(error);
        expect(false).toBeTruthy();
      }
    });
  });
});
