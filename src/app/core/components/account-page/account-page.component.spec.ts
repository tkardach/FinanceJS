import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { AccountService } from 'src/app/modules/account/shared/account.service';
import { AccountPageComponent } from './account-page.component';
import { Account, Currency } from '../../../modules/account/shared/account.model';

class MockAccountService {
  static THROW_ERROR: boolean = false;

  getAccounts() : Observable<Account[]> {
    let account1: Account = {
      id: 0,
      name: 'Name',
      currency: Currency.USD
      }
    return of([account1])
  }
}

describe('AccountPageComponent', () => {
  let component: AccountPageComponent;
  let fixture: ComponentFixture<AccountPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageComponent ],
      providers: [
        { provide: AccountService, useClass: MockAccountService } 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
