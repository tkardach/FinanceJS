import { TestBed } from '@angular/core/testing';

import { TutorialGuard } from './tutorial.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('TutorialGuard', () => {
  let guard: TutorialGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    guard = TestBed.inject(TutorialGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
