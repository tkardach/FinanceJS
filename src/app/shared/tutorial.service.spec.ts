import { TestBed } from '@angular/core/testing';

import { TutorialService } from './tutorial.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('TutorialService', () => {
  let service: TutorialService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    service = TestBed.inject(TutorialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
