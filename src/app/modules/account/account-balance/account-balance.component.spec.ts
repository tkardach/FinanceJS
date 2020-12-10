import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { LoggerConfig, NGXLogger, NGXLoggerHttpService, NgxLoggerLevel, NGXMapperService } from 'ngx-logger';
import { AccountService } from '../shared/account.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccountBalanceComponent } from './account-balance.component';
import { DatePipe } from '@angular/common';
import { Currency, Account } from '../shared/account.model';
import { By } from '@angular/platform-browser';
import { getAmountString } from '../shared/utility'

const setBalance: number = 504023.54;

class MockAccountService {
  static THROW_ERROR: boolean = false;

  async getAccountBalanceOnDate(accountId: number, date: Date) : Promise<number> {
    if (MockAccountService.THROW_ERROR)
      return new Promise((res, rej) => {rej('Unknown Error')});
    else
      return new Promise((res, rej) => {res(setBalance)});
  }
}

describe('AccountBalanceComponent', () => {
  let component: AccountBalanceComponent;
  let fixture: ComponentFixture<AccountBalanceComponent>;
  let account: Account;
  let date: Date;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountBalanceComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        NGXLogger,
        NgxIndexedDBService,
        NGXMapperService,
        NGXLoggerHttpService,
        DatePipe,
        {provide: LoggerConfig, useValue: {level: NgxLoggerLevel.ERROR}},
        { provide: AccountService, useClass: MockAccountService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AccountBalanceComponent);
    component = fixture.componentInstance;
    account = {
      id: 0,
      name: 'Account Name',
      currency: Currency.USD
    }
    date = new Date(2015, 1, 1);
    component.account = account;
    component.date = date;
    tick();
    fixture.detectChanges();

    el = fixture.debugElement.nativeElement;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display account name in account-balance', () => {
    let name = el.querySelector('#name');
    expect(name.innerHTML).toBe(account.name);
  });

  it('should display account balance in account-balance', () => {
    let balance = el.querySelector('#balance');
    expect(balance.innerHTML).toBe('$504,023.54');
  });

  it('should trigger onClick when account-balance is clicked', fakeAsync(() => {
    spyOn(component, 'onClick');
    fixture.debugElement.query(By.css('#account-balance')).triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    expect(component.onClick).toHaveBeenCalled();
  }));

  it('should call resloadAccount after resetting account', fakeAsync(() => {
    spyOn(component, 'reloadAccount');
    account = {
      id: 1,
      name: 'New Account Name',
      currency: Currency.CAD
    };
    component.account = account;

    tick();
    fixture.detectChanges();

    expect(component.reloadAccount).toHaveBeenCalledTimes(1);

    let name = el.querySelector('#name');
    expect(name.innerHTML).toBe(account.name);
    let balance = el.querySelector('#balance');
    expect(balance.innerHTML).toBe(getAmountString(setBalance, Currency.CAD));
  }));
});
