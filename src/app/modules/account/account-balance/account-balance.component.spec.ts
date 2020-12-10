import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { NGXLogger } from 'ngx-logger';
import { AccountService } from '../shared/account.service';

import { AccountBalanceComponent } from './account-balance.component';

class MockAccountService {

}

describe('AccountBalanceComponent', () => {
  let component: AccountBalanceComponent;
  let fixture: ComponentFixture<AccountBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountBalanceComponent ],
      providers: [
        NGXLogger,
        NgxIndexedDBService,
        { provide: AccountService, useClass: MockAccountService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
