import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Subject } from "rxjs";
import { ISystemSettings } from "src/app/models/system-settings";
import { ILevelAccess, IUser } from "src/app/models/user";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor(private cookieService: CookieService, private router: Router) {}

  UserSubject = new Subject<void>();
  NavbarSubject = new Subject<boolean | undefined>();
  AsideSubject = new Subject<boolean | undefined>();
  myUser: IUser = {} as IUser;

  mySettings: ISystemSettings = {} as ISystemSettings;

  perm?: ILevelAccess = {};

  get myself() {
    return this.myUser;
  }

  set myself(user: IUser) {
    this.myUser = user;
  }

  get mysetting(): ISystemSettings {
    return this.mySettings;
  }

  set mysetting(setting: ISystemSettings) {
    this.mySettings = setting;
  }

  watchUser() {
    return this.UserSubject.asObservable();
  }

  changeUser(): void {
    this.UserSubject.next();
  }

  watchNavbar() {
    return this.NavbarSubject.asObservable();
  }

  unwatchNavbar() {
    this.NavbarSubject.unsubscribe();
  }

  watchAside() {
    return this.AsideSubject.asObservable();
  }

  unwatchAside() {
    this.AsideSubject.unsubscribe();
  }

  changeNavbar(hidden?: boolean): void {
    this.NavbarSubject.next(hidden);
  }

  changeAside(hidden?: boolean): void {
    this.AsideSubject.next(hidden);
  }

  get token() {
    if (this.cookies) {
      return this.cookieService.get("token");
    } else {
      return sessionStorage.getItem("token");
    }
  }

  /**
   * Função para setar o token no cookie
   * @param token Token que vem da API
   * @param keep Se true, o cookie expira em 60 dias, se false, o cookie expira quando o browser é fechado
   * @return void
   *
   * @author Kauã Landi
   */
  setToken(token: string, keep = false): void {
    if (this.cookies) {
      this.cookieService.set(
        "token",
        token,
        keep ? 60 : undefined,
        "/",
        undefined,
        this.ssl,
        "Strict"
      );
    } else {
      sessionStorage.setItem("token", token);
    }
  }

  get cookies() {
    return localStorage.getItem("cookies") === "true";
  }

  set cookies(value: boolean) {
    localStorage.setItem("cookies", value.toString());
  }

  logout() {
    this.setToken("");
    this.router.navigate(["/login"]);
  }

  get ssl() {
    return location.protocol === "https:";
  }

  setInitialSettings(data: ISystemSettings) {
    this.mySettings = data;
  }

  get mysettings() {
    return this.mySettings;
  }

  set mysettings(settings: ISystemSettings) {
    this.mySettings = settings;
  }

  getPermitions(rote: string) {
    const rota = rote;
    this.myUser.level_access?.map((p) => {
      if (rota === p.router) {
        // console.log(p);
        this.perm = { ...p };
        // return {...p}
      }
      return {};
    });
    console.log(this.perm);
  }
}
