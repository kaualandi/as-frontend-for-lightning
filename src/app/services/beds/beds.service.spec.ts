import { TestBed } from '@angular/core/testing';

import { BedsService } from './beds.service';
import { HttpService } from '../http/http.service';
import { environment } from 'src/environments/environment';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpParams } from '@angular/common/http';
import { IPagedReq } from 'src/app/models/utils';

describe('BedsService', () => {
  let beds_service: BedsService;
  let http_testing_controller: HttpTestingController;
  let base_url: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BedsService,
        HttpService
      ]
    });
    beds_service = TestBed.inject(BedsService);
    http_testing_controller = TestBed.inject(HttpTestingController);
    base_url = environment.base_url;
  });

  afterEach(() => {
    http_testing_controller.verify();
  });

  it('should be created', () => {
    expect(beds_service).toBeTruthy();
  });

  // ? Deve recuperar a lista de leitos da api com filtros e paginação
  it('should retrieve list of beds from the API with filters and pagination', () => {
    const mock_params = {
      department: 'Cardiology',
      bed: '101',
      patient: 'John Doe',
      alarm: 'Critical',
      status: 'Occupied',
    };
    const page = 1;

    beds_service.getBeds(page, mock_params).subscribe((response: IPagedReq<any>) => {
      expect(response).toEqual({
        count: 10,
        previous: '',
        next: '',
        results: []
      })
    });

    const request = http_testing_controller.expectOne(`${base_url}auth/login`);

    expect(request.request.method).toBe('GET');
    expect(request.request.params instanceof HttpParams).toBeTrue();
    request.flush({ 
      page,
      previous: null,
      next: '',
      results: []
     });
  });
});