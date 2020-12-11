import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Currency, Account } from '../shared/account.model';
import { AccountComponent } from './account.component';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let el: HTMLElement;
  let account: Account;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    account = {
      id: 0,
      name: 'Account Name',
      currency: Currency.USD
    }
    component.account = account;
    fixture.detectChanges();

    el = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger onClick when account is clicked', fakeAsync(() => {
    spyOn(component, 'onClick');
    fixture.debugElement.query(By.css('#account')).triggerEventHandler('click', null);
    tick();
    fixture.detectChanges();
    expect(component.onClick).toHaveBeenCalled();
  }));

  it('should display account name in account', () => {
    let name = el.querySelector('#name');
    expect(name.innerHTML).toBe(account.name);
  });

  it('should call update name after resetting account', fakeAsync(() => {
    account = {
      id: 1,
      name: 'New Account Name',
      currency: Currency.CAD
    };
    component.account = account;

    tick();
    fixture.detectChanges();

    let name = el.querySelector('#name');
    expect(name.innerHTML).toBe(account.name);
  }));
});
