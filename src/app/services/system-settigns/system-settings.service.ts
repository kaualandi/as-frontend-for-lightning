import { HttpService } from "./../http/http.service";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import {
  IDefaultSettings,
  ISystemSettings,
} from "src/app/models/system-settings";

@Injectable({
  providedIn: "root",
})
export class SystemSettingsService {
  constructor(private http: HttpService) {}

  getSettings() {
    return this.http.get<ISystemSettings>("core/get-config/");
  }
}
