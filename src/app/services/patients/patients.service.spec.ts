/* eslint-disable camelcase */
import { TestBed } from '@angular/core/testing';

import { PatientsService } from './patients.service';
import { HttpService } from '../http/http.service';
import { environment } from 'src/environments/environment';
import { HttpTestingController } from '@angular/common/http/testing';
import { HttpParams } from '@angular/common/http';
import { IPagedReq } from 'src/app/models/utils';


describe('PatientsService', () => {
  let patients_service: PatientsService;
  let http_testing_controller: HttpTestingController;
  let base_url: string;


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PatientsService,
        HttpService,
      ]
    });
    patients_service = TestBed.inject(PatientsService);
    http_testing_controller = TestBed.inject(HttpTestingController);
    base_url = environment.base_url;
  });

  afterEach(() => {
    http_testing_controller.verify();
  });

  it('should be created', () => {
    expect(patients_service).toBeTruthy();
  });


  // ? Deve recuperar a lista de pacientes da api com filtros e paginação
  it('should retrieve list of patients from the API with filters and pagination', () => {
    const mock_params = {
      patient: 'Juvenaldo da Costa Silva',
      type: 'Adult',
      gender: 'Male',
      blood: 'A+',
      admissionDate: '06/04/2023',
      doctor: 'Dr. Fulano S. Muller',
      department: 'UTI',
      bed: '06',
    };
    const page = 1;

    patients_service.getPatients(page, mock_params).subscribe((response: IPagedReq<any>) => {
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
