import { TestBed } from '@angular/core/testing';

import { HistoricsService } from './historics.service';

describe('HistoricsService', () => {
  let service: HistoricsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
