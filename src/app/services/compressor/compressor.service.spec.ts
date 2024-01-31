import { TestBed } from '@angular/core/testing';

import { CompressorService } from './compressor.service';

describe('CompressorService', () => {
  let service: CompressorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompressorService);
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });
});
