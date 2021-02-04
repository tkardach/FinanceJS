import { TestBed } from '@angular/core/testing';

import { CompositeRouteGuard } from './composite-route.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('CompositeRouteGuard', () => {
  let guard: CompositeRouteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    guard = TestBed.inject(CompositeRouteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
