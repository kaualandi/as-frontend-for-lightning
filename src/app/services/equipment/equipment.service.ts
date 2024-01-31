import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import {
  IEquipment,
  IEquipmentType,
  IEquipmentsByBed,
  IVerifyEquipment
} from "src/app/models/equipment";
import { IPagedReq, IReqFilter } from "src/app/models/utils";
import { environment } from "src/environments/environment";
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: "root"
})
export class EquipmentService {
  constructor(private http: HttpService) {}

  getEquipments(page: number, filters: IReqFilter) {
    const params = new HttpParams({ fromObject: filters })
      .set("page", page)
      .set("page_size", environment.page_size);

    return this.http.get<IPagedReq<IEquipment>>("core/list-equipment", params);
  }

  getEquipmentTypes() {
    return this.http.get<IEquipmentType[]>("core/list-type/");
  }

  postEquipment(equipment: IEquipment) {
    const body = {
      type: equipment.type,
      brand: equipment.brand,
      model: equipment.model,
      protocol: equipment.protocol,
      department: equipment.department,
      ip: equipment.ip || "",
      port: equipment.port || "",
      mac_address: equipment.mac_address || "",
      is_active: equipment.is_active || true,
      bed: equipment.bed,
      set_department: equipment.set_department,
      set_bed: equipment.set_bed,
      set_patient: equipment.set_patient
    };

    return this.http.post<IEquipmentType[]>("core/create-equipment/", body);
  }

  patchEquipment(equipment: IEquipment) {
    const body = {
      type: equipment.type,
      brand: equipment.brand,
      model: equipment.model,
      protocol: equipment.protocol,
      department: equipment.department,
      ip: equipment.ip || "",
      port: equipment.port || "",
      mac_address: equipment.mac_address || "",
      is_active: equipment.is_active || true,
      bed: equipment.bed,
      set_department: equipment.set_department,
      set_bed: equipment.set_bed,
      set_patient: equipment.set_patient
    };

    return this.http.patch<IEquipmentType[]>(
      `core/update-equipment/?id=${equipment.id}`,
      body
    );
  }

  deletEquipment(id: number) {
    const params = new HttpParams().set("id", id);
    return this.http.delete<void>(`core/delete-equipment/`, params);
  }

  postVerifyEquipment(ip: string, port: string, mac_address: string) {
    const body = { ip, port, mac_address };
    return this.http.post<IVerifyEquipment>(`core/verify-equipment/`, body);
  }

  getVerifyEquipment(id: number) {
    const params = new HttpParams().set("id", id);
    return this.http.get<IVerifyEquipment>(
      `core/status-verify-equipment/`,
      params
    );
  }

  getEquipmentsByBed(id: number) {
    return this.http
      .get<IEquipmentsByBed[]>(`core/list-equipment-by-bed/`)
      .pipe(
        map((data) => {
          return data.find((equipment) => equipment.bed.id === id);
        })
      );
  }

  getEquipment(id: number) {
    const params = new HttpParams().set("id", id);
    return this.http.get<IEquipment>(`core/get-equipment-by-id/`, params);
  }

  listEquipmentsAll() {
    const params = new HttpParams().set("page", 1).set("page_size", 10000);
    return this.http.get<IPagedReq<IEquipment>>("core/list-equipment", params);
  }
}
