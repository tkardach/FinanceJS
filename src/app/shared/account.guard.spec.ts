import { TestBed } from '@angular/core/testing';

import { AccountGuard } from './account.guard';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AccountService } from '../modules/account/shared/account.service';
import { AccountModule } from '../modules/account/account.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AccountGuard', () => {
  let guard: AccountGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AccountModule, RouterTestingModule],
      providers: [NgxIndexedDBService, AccountService]
    });
    guard = TestBed.inject(AccountGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
