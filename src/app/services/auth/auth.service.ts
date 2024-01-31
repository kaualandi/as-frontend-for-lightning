import { map } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IToken, IUser } from "src/app/models/user";
import { HttpService } from "../http/http.service";
import { Md5 } from "md5-typescript";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpService) {}

  login(email: string, password: string) {
    const body = new HttpParams()
      .set("username", email)
      .set("password", Md5.init(password).toUpperCase());

    return this.http.post<IToken>("core/auth/", body);
  }

  getMe() {
    return this.http.get<IUser>("core/get-user/");
  }
}
