import { TestBed } from "@angular/core/testing";
import { environment } from "src/environments/environment";

import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { HttpService } from "../http/http.service";
import { SnackbarService } from "../snackbar/snackbar.service";
import { DepartmentService } from "./department.service";

describe("DepartmentService", () => {
  let service: DepartmentService;
  let http_testing_controller: HttpTestingController;
  let base_url: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [DepartmentService, HttpService, SnackbarService],
    });
    service = TestBed.inject(DepartmentService);
    http_testing_controller = TestBed.inject(HttpTestingController);
    base_url = environment.base_url;
  });

  afterEach(() => {
    http_testing_controller.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
