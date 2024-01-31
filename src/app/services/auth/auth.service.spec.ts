/* eslint-disable camelcase */
import { HttpParams } from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";
import { HttpService } from "../http/http.service";
import { SnackbarService } from "../snackbar/snackbar.service";

describe("AuthService", () => {
  let auth_service: AuthService;
  let http_testing_controller: HttpTestingController;
  let base_url: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [AuthService, HttpService, SnackbarService],
    });

    auth_service = TestBed.inject(AuthService);
    http_testing_controller = TestBed.inject(HttpTestingController);
    base_url = environment.base_url;
  });

  afterEach(() => {
    http_testing_controller.verify();
  });

  it("should be created", () => {
    expect(auth_service).toBeTruthy();
  });

  // ? Deve chamar uma requisição post com os parâmetros corretos
  it("should call a post request with the correct parameters", () => {
    const email = "example@example.com";
    const password = "password";

    auth_service.login(email, password).subscribe((response: any) => {
      expect(response).toEqual({ token: "fake-token" });
    });

    const request = http_testing_controller.expectOne(`${base_url}core/auth/`);

    expect(request.request.method).toBe("POST");
    expect(request.request.body instanceof HttpParams).toBeTrue();

    request.flush({ token: "fake-token" });
  });

  // ? Deve chamar uma requisição de get user com o token correto
  it("should call a get user request with the correct token", () => {
    const token = "fake-token";

    auth_service.getMe().subscribe((response: any) => {
      expect(response).toEqual({ id: 1, name: "Foo" });
    });

    const request = http_testing_controller.expectOne(`${base_url}auth/me`);

    expect(request.request.method).toBe("GET");

    request.flush({ id: 1, name: "Foo" });
  });
});
