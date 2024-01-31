import { ElementRef, Renderer2 } from '@angular/core';
import { IconDirective } from './icon.directive';
import { DomSanitizer } from '@angular/platform-browser';

describe('IconDirective', () => {
  it('Deve ser criado uma instância', () => {
    const directive = new IconDirective(
      Renderer2 as any,
      ElementRef as any,
      DomSanitizer as any
    );
    expect(directive).toBeTruthy();
  });
});
