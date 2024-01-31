import { TestBed } from '@angular/core/testing';

import { CurvesService } from './curves.service';

describe('CurvesService', () => {
  let service: CurvesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurvesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
