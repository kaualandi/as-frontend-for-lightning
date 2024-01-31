import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChannelsComponent } from './list-channels.component';

describe('ListChannelsComponent', () => {
  let component: ListChannelsComponent;
  let fixture: ComponentFixture<ListChannelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListChannelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListChannelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
