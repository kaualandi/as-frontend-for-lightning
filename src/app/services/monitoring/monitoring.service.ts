import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IBed } from "src/app/models/beds";
import { IChannelParam, IParam } from "src/app/models/equipment";
import {
  IMonitoring,
  IReorderParamsData,
  IUpdateChannel,
} from "src/app/models/monitoring";
import { IPagedReq } from "src/app/models/utils";
import { environment } from "src/environments/environment";
import { BodyJson, HttpService } from "../http/http.service";

@Injectable({
  providedIn: "root",
})
export class MonitoringService {
  // constructor() {}

  MonitoringSubject = new Subject<void>();
  OrderSubject = new Subject<void>();

  beds: IBed[] = [];
  monitorings: IMonitoring[] = [];

  getMonitorings() {
    return this.monitorings;
  }

  setMonitoring(monitorings: IMonitoring[]) {
    this.monitorings = monitorings;
  }

  watchMonitoring() {
    // console.log("teste 1");
    return this.MonitoringSubject.asObservable();
  }

  unwatchMonitoring() {
    this.MonitoringSubject.unsubscribe();
  }

  changeMonitoring(): void {
    this.MonitoringSubject.next();
  }

  watchOrder() {
    return this.OrderSubject.asObservable();
  }

  unwatchOrder() {
    this.OrderSubject.unsubscribe();
  }

  changeOrder(): void {
    this.OrderSubject.next();
  }

  constructor(private http: HttpService) {}

  getMonitoringsAll() {
    const params = new HttpParams()
      .set("page", 1)
      .set("page_size", environment.page_size);

    return this.http.get<IPagedReq<IMonitoring>>(
      "core/list-monitoring-realtime/",
      params
    );
  }

  getNewMonitoringsAll() {
    const query = new HttpParams().set("page", 1).set("page_size", 1000000);

    return this.http.get<IPagedReq<IMonitoring>>(
      "core/list-monitoring-realtime2/",
      query
    );
  }

  getNewBedsById(id: number) {
    const params = new HttpParams().set("bed", id);

    return this.http.get<IMonitoring[]>(
      "core/list-monitoring-realtime2/",
      params
    );
  }

  getBedsConfig(id: number) {
    const params = new HttpParams().set("equipment", id);

    return this.http.get<IChannelParam[]>(
      "core/list-channel-by-equipment/",
      params
    );
  }

  reorderParams(data: IReorderParamsData) {
    return this.http.patch<{ worked: true }>(
      "core/update-params-order/",
      data as unknown as BodyJson
    );
  }

  reorderChannels(data: IReorderParamsData) {
    return this.http.patch<{ worked: true }>(
      "core/update-channel-order/",
      data as unknown as BodyJson
    );
  }

  toggleParamStatus(id: number, status: boolean) {
    const params = new HttpParams().set("id", id).set("is_active", status);

    return this.http.patch<IParam>("core/update-channel-param/", params);
  }

  updateChannel(channel: any) {
    // const params = new HttpParams().set("equipment", channel.equipment).set("channel", channel.channel ) .set("color", channel.color);

    const body = {
      equipment: channel.equipment,
      channel: channel.channel,
      color: channel.color,
    };

    return this.http.patch<IUpdateChannel>(`core/update-channel-config/`, body);
  }

  postParamByEquipment(createParam: any) {
    return this.http.post<any>("core/create-equipment-param/", createParam);
  }
}
