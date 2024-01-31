import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { IToken } from "src/app/models/user";
import { Md5 } from "md5-typescript";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private http: HttpService) {}

  setPass(token: string, password: string) {
    const query = new HttpParams()
      .set("token", token)
      .set("password", Md5.init(password).toUpperCase());
    return this.http.post<IToken>("core/change-password/", query);
  }

  resetPass(email: string) {
    const body = new HttpParams().set("email", email);
    return this.http.post<string>("core/forgot-password/", body);
  }
}
