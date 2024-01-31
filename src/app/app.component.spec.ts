import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  // it('Deve testar o uso do matcher toEqual()', () => {
  //   // ? Para verificar se os valores são iguais
  //   expect(true).toEqual(true);
  //   expect([1, 2, 3]).toEqual([1, 2, 3]);
  //   // expect(10).toEqual(5); // ? teste falha
  //   // expect([1, 2, 3]).toEqual([]); // ? teste falha
  //   expect([1, 2, 3]).not.toEqual([]); // ? teste falha
  // });

  // it('Deve testar o uso do matcher toBe()', () => {
  //   // ? Para verificar se os objetos são iguais (mesma referência)
  //   const nomes = ['João', 'Maria', 'José'];
  //   const nomes2 = ['João', 'Maria', 'José'];
  //   // expect(nomes).toBe(nomes2); // ? teste falha pois são objetos diferentes
  //   // expect(['João', 'Maria', 'José']).toBe(['João', 'Maria', 'José']); // ? teste falha pois são objetos diferentes
  //   const age = 10;
  //   expect(age).toBe(10);
  // });

  // it('Deve testar o uso do matcher toBeTruthy()', () => {
  //   // ? Para verificar se o valor é verdadeiro
  //   expect('João').toBeTruthy();
  //   expect(10).toBeTruthy();
  //   expect([]).toBeTruthy();
  //   expect({}).toBeTruthy();
  //   expect(true).toBeTruthy();
  //   // expect(false).toBeTruthy(); // ? teste falha pois é falso
  // });

  // it('Deve testar o uso do matcher toBeFalsy()', () => {
  //   // ? Para verificar se o valor é falso
  //   expect('').toBeFalsy();
  //   expect(0).toBeFalsy();
  //   expect(NaN).toBeFalsy();
  //   expect(null).toBeFalsy();
  //   expect(undefined).toBeFalsy();
  //   expect(false).toBeFalsy();
  //   // expect(true).toBeFalsy(); // ? teste falha pois é verdadeiro
  // });

  // it('Deve testar o uso do matcher toBeTrue() e toBeFalse()', () => {
  //   // ? Para verificar se o valor é verdadeiro ou falso BOLEANO
  //   expect(true).toBeTrue();
  //   expect(false).toBeFalse();
  //   // expect(1).toBeTrue(); // ? teste falha pois não é boleano
  //   // expect(0).toBeFalse(); // ? teste falha pois não é boleano
  // });
});
