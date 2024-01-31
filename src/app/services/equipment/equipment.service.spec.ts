import { TestBed } from "@angular/core/testing";

import { HttpClientTestingModule } from "@angular/common/http/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { EquipmentService } from "./equipment.service";
import { HttpService } from "../http/http.service";
import { SnackbarService } from "../snackbar/snackbar.service";

describe("EquipmentService", () => {
  let service: EquipmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [EquipmentService, HttpService, SnackbarService],
    });
    service = TestBed.inject(EquipmentService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
