import { CompressorService } from '../services/compressor/compressor.service';
import { InputFileDirective } from './input-file.directive';

describe('InputFileDirective', () => {
  it('Deve ser criado uma instância', () => {
    const directive = new InputFileDirective(CompressorService as any);
    expect(directive).toBeTruthy();
  });
});
