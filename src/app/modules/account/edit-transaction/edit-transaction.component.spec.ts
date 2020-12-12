import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountModule } from '../account.module';

import { EditTransactionComponent } from './edit-transaction.component';
import { By } from '@angular/platform-browser';
import { Transaction, Timespan } from '../shared/transaction.model';

describe('EditTransactionComponent', () => {
  let component: EditTransactionComponent;
  let fixture: ComponentFixture<EditTransactionComponent>;
  let el: HTMLElement;
  let transaction: Transaction;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTransactionComponent ],
      imports: [ AccountModule, SharedModule, BrowserAnimationsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTransactionComponent);
    component = fixture.componentInstance;
    transaction = {
      id: 0,
      account: 1,
      name: 'trans',
      amount: 15,
      recurrence: Timespan.Biweekly,
      date: new Date()
    }

    component.transaction = transaction;

    fixture.detectChanges();
    el = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onSubmit on button press', () => {
    spyOn(component, 'onSubmit');
    let buttonEl = fixture.debugElement.query(By.css('#submit'));
    let button = buttonEl.nativeElement
    button.click();

    expect(component.onSubmit).toHaveBeenCalledTimes(1);
  });

  it('should change property name when entering name input', fakeAsync(() => {
    const expectedValue = "New Name";
    let nameEl = fixture.debugElement.query(By.css('#name'));
    let name = nameEl.nativeElement
    name.value = expectedValue;
    name.dispatchEvent(new Event('blur'));
    
    tick();
    fixture.detectChanges();

    expect(component.transaction.name).toBe(expectedValue);
  }));

  it('should change property amount when entering amount input', fakeAsync(() => {
    const input = "-15555";
    const expectedValue = -15555;
    let amountEl = fixture.debugElement.query(By.css('#amount'));
    let amount = amountEl.nativeElement
    amount.value = input;
    amount.dispatchEvent(new Event('blur'));
    
    tick();
    fixture.detectChanges();
    
    expect(component.transaction.amount).toBe(expectedValue);
  }));

  it('should change property date when entering date input', fakeAsync(() => {
    const expectedValue = "12/11/2020";
    let dateEl = fixture.debugElement.query(By.css('#date'));
    let date = dateEl.nativeElement
    date.value = expectedValue;
    date.dispatchEvent(new Event('blur'));
    
    tick();
    fixture.detectChanges();
    
    expect(component.transaction.date).not.toBeUndefined();
    expect(String(component.transaction.date)).toBe(expectedValue);
  }));

  it('should change background and button color when amount is negative', () => {
    component.amount = '-1555';

    fixture.detectChanges();

    let div = el.querySelector('.edit-transaction')
    let button = el.querySelector('#submit')

    expect(div.classList).toContain('background-negative')
    expect(button.classList).toContain('background-negative')
  });

  it('should change background and button color when amount is positive', () => {
    component.amount = '1555';

    fixture.detectChanges();

    let div = el.querySelector('.edit-transaction')
    let button = el.querySelector('#submit')

    expect(div.classList).toContain('background-positive')
    expect(button.classList).toContain('background-positive')
  });

  it('should display current transaction data in the form', fakeAsync(() => {
    let name = fixture.debugElement.query(By.css('#name')).nativeElement;
    let amount = fixture.debugElement.query(By.css('#amount')).nativeElement;
    let date = fixture.debugElement.query(By.css('#date')).nativeElement;

    name.dispatchEvent(new Event('blur'))
    amount.dispatchEvent(new Event('blur'))
    date.dispatchEvent(new Event('blur'))

    fixture.detectChanges();
    tick();

    expect(name.value).toBe(transaction.name)
    expect(amount.value).toBe('$0.00')
    expect(date.value).toBe(transaction.date)
  }));

  it('should change transaction recurrence on selection', fakeAsync(() => {
    let recurrence = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
    recurrence.click();

    fixture.detectChanges();

    const matOption = fixture.debugElement.query(By.css('.mat-option')).nativeElement;
    matOption.click();

    fixture.detectChanges();
    
    expect(component.transaction.recurrence).toBe(Timespan.Once)
  }));
});
