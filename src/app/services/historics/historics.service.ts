import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IHistoric } from "src/app/models/historic";
import { IPagedReq, IReqFilter } from "src/app/models/utils";
import { environment } from "src/environments/environment";
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: "root",
})
export class HistoricsService {
  constructor(private http: HttpService) {}

  getHistoric(page: number, filters: IReqFilter) {
    const params = new HttpParams({ fromObject: filters })
      .set("page", page)
      .set("page_size", environment.page_size);

    return this.http.get<IPagedReq<IHistoric>>("core/history-alarm", params);
  }
}
