import { ComponentFixture, TestBed, tick } from "@angular/core/testing";

import { BedDisplayComponent } from "./bed-display.component";
import { HttpTestingController } from "@angular/common/http/testing";
import { IBedData } from "src/app/models/beds";
import { Router } from "@angular/router";

describe("BedDisplayComponent", () => {
  let component: BedDisplayComponent;
  let fixture: ComponentFixture<BedDisplayComponent>;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BedDisplayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BedDisplayComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify(); // Verifica se todas as solicitações foram tratadas corretamente.
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // ? deve buscar os dados do monitor no init
  it("should fetch monitor data on init", () => {
    const monitorDataMock: IBedData = {} as IBedData;

    component.ngOnInit(); // Chama o ngOnInit explicitamente

    const req = httpMock.expectOne("/api/monitoring/1");
    expect(req.request.method).toBe("GET");
    req.flush(monitorDataMock);

    expect(component.bed).toEqual(monitorDataMock);
  });

  // ? deve navegar para /monitoring/:id/config no botão de configuração, clique
  it("should navigate to /monitoring/:id/config on config button click", () => {
    const navigateSpy = spyOn(router, "navigate");

    component.redirectToConfig();

    expect(navigateSpy).toHaveBeenCalledWith(["/monitoring/detail/1/config"]);
  });

  // ? deve emitir sinal de atualização quando o botão de atualização é clicado
  it("should emit refresh signal when refresh button is clicked", () => {
    const emitSpy = spyOn(component, "emitEvent"); // Espiona o evento de saída 'refresh'

    const refreshButton =
      fixture.nativeElement.querySelector(".refresh-button"); // Seleciona o botão de refresh no DOM

    refreshButton.click(); // Dispara o evento de clique no botão de refresh

    expect(emitSpy).toHaveBeenCalled(); // Verifica se o evento de saída 'refresh' foi chamado
  });
});
