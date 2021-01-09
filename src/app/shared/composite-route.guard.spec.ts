import { TestBed } from '@angular/core/testing';

import { CompositeRouteGuard } from './composite-route.guard';

describe('CompositeRouteGuard', () => {
  let guard: CompositeRouteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CompositeRouteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
