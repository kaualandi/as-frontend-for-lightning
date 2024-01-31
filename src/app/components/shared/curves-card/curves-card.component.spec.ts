import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurvesCardComponent } from './curves-card.component';

describe('CurvesCardComponent', () => {
  let component: CurvesCardComponent;
  let fixture: ComponentFixture<CurvesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurvesCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurvesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
