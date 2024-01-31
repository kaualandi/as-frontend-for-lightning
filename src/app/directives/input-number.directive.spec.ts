import { ElementRef, Renderer2 } from '@angular/core';
import { InputNumberDirective } from './input-number.directive';

describe('InputNumberDirective', () => {
  it('Deve ser criado uma instância', () => {
    const directive = new InputNumberDirective(
      ElementRef as any,
      Renderer2 as any
    );
    expect(directive).toBeTruthy();
  });
});
