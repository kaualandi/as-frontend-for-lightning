import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAlarmResults } from "src/app/models/alarms";
import { TAlarmPriority } from "src/app/models/beds";
import { IPagedReq, IReqFilter } from "src/app/models/utils";
import { environment } from "src/environments/environment";
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: "root",
})
export class AlarmsService {
  constructor(private http: HttpService) {}
  getAlarms(page: number, filters: IReqFilter) {
    const params = new HttpParams({ fromObject: filters })
      .set("page", page)
      .set("page_size", environment.page_size);

    return this.http.get<IPagedReq<IAlarmResults>>("core/list-alarm", params);
  }

  handleAlarmClass(alarm: TAlarmPriority) {
    switch (alarm) {
      case "HIGH":
        return "red";
      case "MEDIUM":
        return "yellow";
      case "LOW":
        return "blue";
      default:
        return "";
    }
  }
}
