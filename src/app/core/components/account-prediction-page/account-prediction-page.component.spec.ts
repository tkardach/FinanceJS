import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPredictionPageComponent } from './account-prediction-page.component';

describe('AccountPredictionPageComponent', () => {
  let component: AccountPredictionPageComponent;
  let fixture: ComponentFixture<AccountPredictionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPredictionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPredictionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
