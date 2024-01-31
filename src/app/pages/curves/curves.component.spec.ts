import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurvesComponent } from './curves.component';

describe('CurvesComponent', () => {
  let component: CurvesComponent;
  let fixture: ComponentFixture<CurvesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurvesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
