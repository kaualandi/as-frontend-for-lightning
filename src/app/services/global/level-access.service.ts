import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ILevelAcess } from "../../models/user";
import { StorageService } from "../storage/storage.service";

type Key = keyof ILevelAcess;

@Injectable({
  providedIn: "root"
})
export class LevelAccessService {
  constructor(private storage: StorageService, private router: Router) {}

  private userAccess = this.storage.myself.level_access;

  checkLevelAccess(path?: string) {
    if (!path) {
      console.log("sem path");
      path = this.router.url.split("/")[1];
    }

    if (!this.storage.myself.id) return [];
    this.userAccess = this.storage.myself.level_access;

    const access = this.userAccess.find((access) => access.router === path);
    const activedPermissions: Key[] = [];
    if (!access) return activedPermissions;

    Object.keys(access).forEach((key: string) => {
      const permissions: Key[] = [
        "read",
        "create",
        "update",
        "delete",
        "config"
      ];
      if (!permissions.includes(key as Key)) return;
      if (access[key as Key]) {
        activedPermissions.push(key as Key);
      }
    });

    return activedPermissions;
  }
}
