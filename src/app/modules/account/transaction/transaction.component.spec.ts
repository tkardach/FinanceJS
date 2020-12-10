import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Timespan, Transaction } from '../shared/transaction.model';
import { Currency } from '../shared/account.model';

import { TransactionComponent } from './transaction.component';
import { By } from '@angular/platform-browser';

describe('TransactionComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;
  let transaction: Transaction;
  let el: HTMLElement;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;
    transaction = {
      id: 0,
      account: 1,
      name: 'Test Transaction',
      amount: 52.52,
      date: new Date(),
      recurrence: Timespan.Biweekly
    }

    component.transaction = transaction;
    fixture.detectChanges();

    el = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display transaction name', () => {
    let name = el.querySelector('#name');
    expect(name.innerHTML).toBe(transaction.name);
  });

  it('should display green amount if positive', () => {
    let amount = el.querySelector('#amount');
    expect(amount.classList).toContain('currency-color-positive');
  });

  it('should display red amount if negative', () => {
    transaction.amount = -100;
    let amount = el.querySelector('#amount');
    fixture.detectChanges();
    expect(amount.classList).toContain('currency-color-negative');
  });

  it('should trigger onClick when transactions is clicked', fakeAsync(() => {
    spyOn(component, 'onClick');
    fixture.debugElement.query(By.css('#transaction')).triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    expect(component.onClick).toHaveBeenCalled();
  }));

  it('should update transaction after resetting it', fakeAsync(() => {
    transaction = {
      id: 0,
      account: 2,
      name: 'New Test Transaction',
      amount: -52.52,
      date: new Date(),
      recurrence: Timespan.Biweekly
    }

    component.transaction = transaction;
    fixture.detectChanges();
    
    let name = el.querySelector('#name');
    expect(name.innerHTML).toBe(transaction.name);
    let amount = el.querySelector('#amount');
    fixture.detectChanges();
    expect(amount.classList).toContain('currency-color-negative');
  }));
});
