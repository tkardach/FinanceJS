import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountModule } from '../account.module';
import { Currency } from '../shared/account.model';
import { Timespan } from '../shared/transaction.model';
import { CreateTransactionComponent } from './create-transaction.component';

describe('CreateTransactionComponent', () => {
  let component: CreateTransactionComponent;
  let fixture: ComponentFixture<CreateTransactionComponent>;
  let el: HTMLElement;
  let currency: Currency;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTransactionComponent ],
      imports: [ AccountModule, SharedModule, BrowserAnimationsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTransactionComponent);
    component = fixture.componentInstance;
    currency = Currency.USD;
    fixture.detectChanges();
    el = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onCreate on button press', () => {
    spyOn(component, 'onCreate');
    let buttonEl = fixture.debugElement.query(By.css('#create'));
    let button = buttonEl.nativeElement
    button.click();

    expect(component.onCreate).toHaveBeenCalledTimes(1);
  });

  it('should change property name when entering name input', fakeAsync(() => {
    const expectedValue = "New Name";
    let nameEl = fixture.debugElement.query(By.css('#name'));
    let name = nameEl.nativeElement
    name.value = expectedValue;
    name.dispatchEvent(new Event('blur'));
    
    tick();
    fixture.detectChanges();

    expect(component.name).toBe(expectedValue);
  }));

  it('should change property amount when entering amount input', fakeAsync(() => {
    const expectedValue = "-15555";
    let amountEl = fixture.debugElement.query(By.css('#amount'));
    let amount = amountEl.nativeElement
    amount.value = expectedValue;
    amount.dispatchEvent(new Event('blur'));
    
    tick();
    fixture.detectChanges();
    
    expect(component.amount).toBe(expectedValue);
  }));

  it('should change property date when entering date input', fakeAsync(() => {
    const expectedValue = "12/11/2020";
    let dateEl = fixture.debugElement.query(By.css('#date'));
    let date = dateEl.nativeElement
    date.value = expectedValue;
    date.dispatchEvent(new Event('blur'));
    
    tick();
    fixture.detectChanges();
    
    expect(component.date).not.toBeUndefined();
    expect(String(component.date)).toBe(expectedValue);
  }));

  it('should change background and button color when amount is negative', () => {
    component.amount = '-1555';

    fixture.detectChanges();

    let div = el.querySelector('.create-transaction')
    let button = el.querySelector('#create')

    expect(div.classList).toContain('background-negative')
    expect(button.classList).toContain('background-negative')
  });

  it('should change background and button color when amount is positive', () => {
    component.amount = '1555';

    fixture.detectChanges();

    let div = el.querySelector('.create-transaction')
    let button = el.querySelector('#create')

    expect(div.classList).toContain('background-positive')
    expect(button.classList).toContain('background-positive')
  });
});
