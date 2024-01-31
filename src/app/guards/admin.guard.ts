import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { AuthService } from "../services/auth/auth.service";
import { StorageService } from "../services/storage/storage.service";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(
    private storage: StorageService,
    private authService: AuthService,
    private router: Router
  ) {}

  async canActivate(next: ActivatedRouteSnapshot) {
    if (!this.storage.token) {
      this.router.navigate(["/login"]);
      return false;
    }

    if (!this.storage.myself.id) {
      try {
        const user = await firstValueFrom(this.authService.getMe());
        this.storage.myself = user;
      } catch (error) {
        this.storage.setToken("");
        this.router.navigate(["/login"]);
        return false;
      }
    }

    const path = next.routeConfig?.path;
    console.log(path);

    const access = this.storage.myself.level_access.find(
      (level) => level.router === path?.split("/")[0]
    );

    if (access && access.read) {
      return true;
    }

    console.log("Sem permissão de acesso!");

    this.router.navigate(["/"]);
    return false;
  }
}
