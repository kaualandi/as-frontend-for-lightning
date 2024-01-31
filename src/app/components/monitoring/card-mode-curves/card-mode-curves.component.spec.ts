import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardModeCurvesComponent } from './card-mode-curves.component';

describe('CardModeCurvesComponent', () => {
  let component: CardModeCurvesComponent;
  let fixture: ComponentFixture<CardModeCurvesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardModeCurvesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardModeCurvesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
