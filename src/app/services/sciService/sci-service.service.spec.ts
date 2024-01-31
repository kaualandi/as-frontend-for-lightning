import { TestBed } from "@angular/core/testing";

import { SciService } from "./sci-service.service";

describe("SciServiceService", () => {
  let service: SciService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SciService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
