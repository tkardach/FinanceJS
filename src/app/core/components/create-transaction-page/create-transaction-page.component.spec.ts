import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransactionPageComponent } from './create-transaction-page.component';
import { AccountService } from 'src/app/modules/account/shared/account.service';

describe('CreateTransactionPageComponent', () => {
  let component: CreateTransactionPageComponent;
  let fixture: ComponentFixture<CreateTransactionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTransactionPageComponent ],
      providers: [AccountService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTransactionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
