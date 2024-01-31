import { IBed, IDepartment } from "./beds";
import { IModel } from "./models";
import { IBrand } from "./monitoring";

export interface IEquipmentFormFilter {
  model: string;
  brand: string;
  type: string;
  department: string;
  bed: string;
  ip: string;
  mac: string;
}

export interface IEquipmentType {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface IProtocol {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface IAlarm {
  id: number;
  priority: "LOW" | "MEDIUM" | "HIGH";
  source: string;
  name: string;
  min: number;
  max: number;
}

export interface IParam {
  id: number;
  name: string;
  alarm: IAlarm[];
  label: string;
  value: number;
  equipment: number;
  is_active: boolean;
  param: string;
}

export interface IChannel {
  id: number;
  channel: string;
  color: string;
  label: string;
  name: string;
  is_active: boolean;
  order: number;
  value: number;
  equipment: number;
  alarm: any;
  size?: string;
}

// export interface IChannel {
//   id: number;
//   name: string;
//   color: string;
//   created_at: string;
//   equipment: number;
//   params: IParam[]; // O tipo correto dos parâmetros depende dos dados reais
//   updated_at: string;
// }

export interface IEquipment {
  isOpen?: boolean;
  id: number;
  bed: number;
  brand: string;
  channels: IChannel[]; // O tipo correto dos canais depende dos dados reais
  created_by: number; // O tipo correto depende dos dados reais
  department: number;
  department_obj: IDepartment;
  brand_obj: IBrand;
  model_obj: IModel;
  bed_obj: IBed;
  ip: string;
  mac_address: string;
  model: string;
  port: string;
  protocol: number;
  status: string;
  type: number;
  type_obj: IEquipmentType;
  last_read_at: string;
  is_active: string;
  set_department: boolean;
  set_patient: boolean;
  set_bed: boolean;
}

export type TEquipament = "Online" | "Offline" | "Desativado" | "-/-";

export interface IVerifyEquipmentStep {
  step: number;
  text: string;
}

export interface IVerifyEquipment {
  id: number;
  ip: string;
  port: string;
  mac_address: string;
  is_checked: boolean;
  description: string | null;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

export interface IEquipmentsByBed {
  bed: IBed;
  equipments: IEquipment[];
}

export type IChannelParam = IChannel & {
  params: IParam[];
};
