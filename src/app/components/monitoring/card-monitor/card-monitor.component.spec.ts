import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMonitorComponent } from './card-monitor.component';
import { MonitoringComponent } from './monitoring.component';

describe('CardMonitorComponent', () => {
  let component: CardMonitorComponent;
  let fixture: ComponentFixture<CardMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardMonitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ? deve processar corretamente o valor de entrada do MonitoringComponent
  it('should correctly process the input value from MonitoringComponent', () => {
    const inputValue = {
      id: 1,
      name: 'Foo'
    }; // Valor de entrada do componente pai

    component.bed = inputValue; // Atribui o valor de entrada ao inputFromParent do componente filho
    fixture.detectChanges(); // Atualiza a exibição do componente filho

    const displayedValue = fixture.nativeElement.querySelector('.bed-id'); // Seleciona o elemento que exibe o valor

    expect(displayedValue.textContent).toContain(`#${inputValue.id}`); // Verifica se o valor de entrada está corretamente processado e exibido
  });

  
  // ? deve emitir sinal de atualização quando o botão de atualização é clicado
  it('should emit refresh signal when refresh button is clicked', () => {
    const emitSpy = spyOn(component, 'emitEvent'); // Espiona o evento de saída 'refresh'

    const refreshButton = fixture.nativeElement.querySelector('.refresh-button'); // Seleciona o botão de refresh no DOM

    refreshButton.click(); // Dispara o evento de clique no botão de refresh

    expect(emitSpy).toHaveBeenCalled(); // Verifica se o evento de saída 'refresh' foi chamado
  });
});
