import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePageLoadingComponent } from './table-page-loading.component';

describe('TablePageLoadingComponent', () => {
  let component: TablePageLoadingComponent;
  let fixture: ComponentFixture<TablePageLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePageLoadingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePageLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
