import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPredictionPageComponent } from './account-prediction-page.component';
import { AccountService } from 'src/app/modules/account/shared/account.service';
import { AccountModule } from 'src/app/modules/account/account.module';
import { TutorialService } from 'src/app/shared/tutorial.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { NGXLogger } from 'ngx-logger';

describe('AccountPredictionPageComponent', () => {
  let component: AccountPredictionPageComponent;
  let fixture: ComponentFixture<AccountPredictionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AccountModule, SharedModule, RouterTestingModule],
      providers: [AccountService, TutorialService, NGXLogger],
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
