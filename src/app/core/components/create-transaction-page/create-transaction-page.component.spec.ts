import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransactionPageComponent } from './create-transaction-page.component';

describe('CreateTransactionPageComponent', () => {
  let component: CreateTransactionPageComponent;
  let fixture: ComponentFixture<CreateTransactionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTransactionPageComponent ]
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
