import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmConfigEditComponent } from './alarm-config-edit.component';

describe('AlarmConfigEditComponent', () => {
  let component: AlarmConfigEditComponent;
  let fixture: ComponentFixture<AlarmConfigEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmConfigEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlarmConfigEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
