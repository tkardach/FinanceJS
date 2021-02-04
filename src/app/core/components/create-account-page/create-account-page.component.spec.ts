import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountPageComponent } from './create-account-page.component';
import { AccountModule } from 'src/app/modules/account/account.module';
import { AccountService } from 'src/app/modules/account/shared/account.service';

describe('CreateAccountPageComponent', () => {
  let component: CreateAccountPageComponent;
  let fixture: ComponentFixture<CreateAccountPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AccountModule],
      providers: [AccountService],
      declarations: [ CreateAccountPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
