import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalAuthComponent } from './operational-auth.component';

describe('OperationalAuthComponent', () => {
  let component: OperationalAuthComponent;
  let fixture: ComponentFixture<OperationalAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationalAuthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
