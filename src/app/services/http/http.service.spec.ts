import { HttpErrorResponse, HttpParams } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { StorageService } from "src/app/services/storage/storage.service";
import { environment } from "src/environments/environment";
import { HttpService } from "./http.service";
import { SnackbarService } from "../snackbar/snackbar.service";

describe("HttpService", () => {
  let httpService: HttpService;
  let httpTestingController: HttpTestingController;
  let storageService: StorageService;
  let snackbarService: SnackbarService;
  // eslint-disable-next-line camelcase
  const base_url = environment.base_url;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [HttpService, StorageService, SnackbarService],
    });

    httpService = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
    storageService = TestBed.inject(StorageService);
    snackbarService = TestBed.inject(SnackbarService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(httpService).toBeTruthy();
  });

  describe("handleError", () => {
    it("should handle client-side error and show snackbar message", () => {
      const errorMessage = "Client-side error message";
      spyOn(snackbarService, "error");
      const errorEvent = new ErrorEvent("error", {
        message: errorMessage,
      });

      httpService.handleError(
        new HttpErrorResponse({
          error: errorEvent,
          status: 0,
          statusText: "",
        })
      );

      expect(snackbarService.error).toHaveBeenCalledWith(errorMessage);
    });

    it("should handle server-side error and show snackbar message", () => {
      const errorMessage = "Server-side error message";
      spyOn(snackbarService, "error");
      const errorResponse = new HttpErrorResponse({
        error: { detail: errorMessage },
        status: 500,
        statusText: "Internal Server Error",
      });

      httpService.handleError(errorResponse).subscribe(
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {},
        // eslint-disable-next-line n/handle-callback-err, @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
        (error) => {}
      );

      expect(snackbarService.error).toHaveBeenCalledWith(
        `Erro: ${500} - ${errorMessage}`
      );
    });
  });

  describe("get", () => {
    it("should send a GET request with the correct URL and headers", () => {
      const url = "test";
      const mockResponse = { data: "test" };

      spyOnProperty(storageService, "token", "get").and.returnValue(
        "test-token"
      );

      storageService.cookies = false;
      storageService.setToken("test-token");

      httpService.get(url).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const request = httpTestingController.expectOne(`${base_url}${url}`);

      expect(request.request.method).toBe("GET");
      expect(request.request.headers.has("Content-Type")).toBeTruthy();
      expect(request.request.headers.get("Content-Type")).toBe(
        "application/json"
      );
      expect(request.request.headers.has("Authorization")).toBeTruthy();

      request.flush(mockResponse);
    });

    it("should send a GET request with the correct URL and headers in another api", () => {
      const url = "https://api.github.com/test";
      const mockResponse = { data: "test" };

      spyOnProperty(storageService, "token", "get").and.returnValue(
        "test-token"
      );

      httpService.get(url).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const request = httpTestingController.expectOne(`${url}`);
      expect(request.request.method).toBe("GET");
      expect(request.request.headers.has("Content-Type")).toBeTruthy();
      expect(request.request.headers.get("Content-Type")).toBe(
        "application/json"
      );
      expect(request.request.headers.has("Authorization")).toBeTruthy();

      request.flush(mockResponse);
    });
  });

  describe("post", () => {
    it("should send a POST request with the correct URL, body, and headers", () => {
      const url = "test";
      const body = { name: "John Doe" };
      const mockResponse = { worked: true };

      spyOnProperty(storageService, "token", "get").and.returnValue(
        "test-token"
      );

      httpService.post(url, body).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const request = httpTestingController.expectOne(`${base_url}${url}`);
      expect(request.request.method).toBe("POST");
      expect(request.request.headers.has("Content-Type")).toBeTruthy();
      expect(request.request.headers.get("Content-Type")).toBe(
        "application/json"
      );
      expect(request.request.headers.has("Authorization")).toBeTruthy();
      expect(request.request.body).toEqual(JSON.stringify(body));

      request.flush(mockResponse);
    });
  });

  describe("patch", () => {
    it("should send a PATCH request with the correct URL, body, and headers", () => {
      const url = "test";
      const body = { name: "John Doe" };
      const mockResponse = { worked: true };

      spyOnProperty(storageService, "token", "get").and.returnValue(
        "test-token"
      );

      httpService.patch(url, body).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const request = httpTestingController.expectOne(`${base_url}${url}`);
      expect(request.request.method).toBe("PATCH");
      expect(request.request.headers.has("Content-Type")).toBeTruthy();
      expect(request.request.headers.get("Content-Type")).toBe(
        "application/json"
      );
      expect(request.request.headers.has("Authorization")).toBeTruthy();
      expect(request.request.body).toEqual(JSON.stringify(body));

      request.flush(mockResponse);
    });

    it("should send a PATCH request with x-www-form-urlencoded content type", () => {
      const url = "test";
      const body = new HttpParams().set("name", "John Doe");
      const mockResponse = { worked: true };

      spyOnProperty(storageService, "token", "get").and.returnValue(
        "test-token"
      );

      httpService.patch(url, body).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const request = httpTestingController.expectOne(`${base_url}${url}`);
      expect(request.request.headers.get("Content-Type")).toBe(
        "application/x-www-form-urlencoded"
      );
      request.flush(mockResponse);
    });
  });

  describe("delete", () => {
    it("should send a DELETE request with the correct URL and headers", () => {
      const url = "test";
      const mockResponse = { worked: true };

      spyOnProperty(storageService, "token", "get").and.returnValue(
        "test-token"
      );

      httpService.delete(url).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const request = httpTestingController.expectOne(`${base_url}${url}`);
      expect(request.request.method).toBe("DELETE");
      expect(request.request.headers.has("Content-Type")).toBeTruthy();
      expect(request.request.headers.get("Content-Type")).toBe(
        "application/json"
      );
      expect(request.request.headers.has("Authorization")).toBeTruthy();

      request.flush(mockResponse);
    });
  });
});
