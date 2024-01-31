import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IBedData } from "src/app/models/beds";
import { IPagedReq, IReqFilter } from "src/app/models/utils";
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: "root",
})
export class BedsService {
  constructor(private http: HttpService) {}
  getBeds(
    page: number,
    page_size = 10,
    bed?: string,
    department?: string,
    filters?: IReqFilter,
    patient?: string,
    status?: string,
    name?: string
  ) {
    let query = new HttpParams({ fromObject: filters })
      .set("page", page)
      .set("page_size", page_size);
    if (bed) query = query.set("bed", bed);
    if (department) query = query.set("department", department);
    if (status) query = query.set("status", status);
    if (patient) query = query.set("patient", patient);
    if (name) query = query.set("name", name);

    return this.http.get<IPagedReq<IBedData>>("core/list-bed/", query);
  }

  posOrderBeds(beds: any) {
    return this.http.post<IBedData>("core/order-bed-by-user/", beds);
  }
}
