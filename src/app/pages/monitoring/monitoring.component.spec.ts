import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MonitoringComponent } from "./monitoring.component";
// import { By } from '@angular/platform-browser';
// import { of } from 'rxjs';
import { NavbarComponent } from "src/app/components/navbar/navbar.component";
// import { LoadingSkeletonComponent } from '../loading-skeleton/loading-skeleton.component';
import { BedsService } from "src/app/services/beds/beds.service";
import { Router } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { SnackbarService } from "src/app/services/snackbar/snackbar.service";

describe("MonitoringComponent", () => {
  let component: MonitoringComponent;
  let fixture: ComponentFixture<MonitoringComponent>;

  let router: Router;

  let navbarComponent: NavbarComponent;
  let navbarFixture: ComponentFixture<NavbarComponent>;
  let bedsService: BedsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, SnackbarService],
      declarations: [MonitoringComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.inject(Router);

    navbarFixture = TestBed.createComponent(NavbarComponent);
    navbarComponent = navbarFixture.componentInstance;
    navbarFixture.detectChanges();

    bedsService = TestBed.inject(BedsService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // ? deve exibir a navegação fora da tela na barra de navegação quando o botão de menu for clicado no monitoramento
  // it('should display off-canvas navigation in Navbar when menu button is clicked in Monitoring', () => {
  //   expect(navbarComponent.is_off_canvas_visible).toBe(false);

  //   const menuButton = fixture.debugElement.query(By.css('.menu-button'));
  //   menuButton.triggerEventHandler('click', null);

  //   fixture.detectChanges();
  //   navbarFixture.detectChanges();

  //   expect(navbarComponent.is_off_canvas_visible).toBe(true);
  // });

  // ? Deve exibir a lista quando o botão é clicado
  it("should display list when button is clicked", () => {
    expect(component.is_list_visible_beds).toBe(false);

    const button = fixture.nativeElement.querySelector(".arrow-navbar");
    button.click();

    fixture.detectChanges();

    expect(component.is_list_visible_beds).toBe(true);
  });

  // ? deve chamar a função de filtro ao fazer a pesquisa
  it("should call filter function when doing the search", () => {
    spyOn(component, "getListBeds");

    const statusInput = fixture.nativeElement.querySelector(".status-input");

    statusInput.value = "Foo";
    statusInput.dispatchEvent(new Event("change"));

    fixture.detectChanges();

    expect(component.getListBeds).toHaveBeenCalled();
  });

  // ? deve chamar a função de filtro ao selecionar o status
  it("should call filter function when selecting status", () => {
    spyOn(component, "getListBeds");

    const searchInput = fixture.nativeElement.querySelector(".search-input");

    searchInput.value = "Alertas";
    searchInput.dispatchEvent(new Event("input"));

    fixture.detectChanges();

    expect(component.getListBeds).toHaveBeenCalled();
  });

  // ? deve inicializar o LoadingSkeleton e buscar a lista em ngOnInit
  it("should initialize LoadingSkeleton and fetch the list on ngOnInit", () => {
    const loadingSkeletonComponent =
      fixture.debugElement.nativeElement.querySelector("app-loading-skeleton"); // Seleciona o componente LoadingSkeleton no DOM

    expect(loadingSkeletonComponent).toBeTruthy(); // Verifica se o componente LoadingSkeleton está presente na página

    spyOn(component, "getListBeds").and.callThrough(); // Espiona o método getList para verificar se ele é chamado

    component.ngOnInit();

    expect(component.getListBeds).toHaveBeenCalled(); // Verifica se o método getList foi chamado
  });

  // ? deve parar de carregar e exibir a contagem de itens na barra lateral e principal quando a solicitação GET for concluída
  // it('should stop loading and display item count in sidebar and main when GET request completes', fakeAsync(() => {
  //   const beds = ['Leito A', 'Leito B', 'Leito C'];

  // spyOn(bedsService, "getBeds").and.returnValue(Promise.resolve(beds));

  //   component.ngOnInit();

  //   expect(component.loading).toBe(true);

  //   tick();

  //   expect(component.loading).toBe(false);
  //   expect(component.beds).toEqual(beds);

  //   fixture.detectChanges();

  //   const bedCount = fixture.nativeElement.querySelectorAll('.list-beds');
  //   const cardMonitorCount = fixture.nativeElement.querySelectorAll('.list-monitor');

  //   expect(bedCount.length).toContain(beds.length);
  //   expect(cardMonitorCount.length).toContain(beds.length);
  // }));

  // ? deve navegar para "/bed-display/:id" com o ID correto ao clicar em um item da barra lateral
  it('should navigate to "/bed-display/:id" with the correct ID when clicking on a sidebar item', () => {
    const leitoId = 1;

    spyOn(router, "navigate");

    component.onSidebarItemClick(leitoId);

    expect(router.navigate).toHaveBeenCalledWith([`/bed-display/${leitoId}}`]);
  });

  // ? deve buscar novamente os dados quando o evento click é emitido do CardMonitorComponent
  // it('should refetch data when click event is emitted from CardMonitorComponent', () => {
  //   const getDataSpy = spyOn(component, 'eventChild').and.returnValue(of(""));

  //   const cardMonitorComponent = fixture.nativeElement.querySelector('app-card-monitor .btn-refresh');

  //   cardMonitorComponent.dispatchEvent(new Event('click'));

  //   expect(getDataSpy).toHaveBeenCalled();
  // });
});
