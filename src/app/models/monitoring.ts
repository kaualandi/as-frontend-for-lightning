import { IChannel, IEquipment } from "./equipment";

export interface ITriggerAlarm {
  color: string;
  rule: string;
  active: boolean;
  param: any;
}

export interface IWave {
  ecg_i?: number[];
  ecg_ii?: number[];
  ecg_iii?: number[];
  resp?: number[];
  pleth?: number[];
}

export interface IWaveObj {
  name?: string;
  data?: number[];
}

export interface IMonitoringSocket {
  equipment: number;
  start_date: string;
  end_date: string;
  waves: IWave[] | IWaveObj[];
}

export interface IDepartment {
  id: number;
  name: string;
  created_at?: string;
  created_by?: number;
  updated_at?: string;
}

export interface IPatient {
  id: number;
  admission_date: string;
  doctor_name: string;
  name: string;
}

export interface IBed {
  id: number;
  name: string;
  status: string;
  department: number;
  department_obj: IDepartment;
  equipments: IEquipment[]; // Se você deseja mapear a matriz de equipamentos
  patient: IPatient;
  is_active: boolean;

  created_at?: string;
  updated_at?: string;
}

export interface IBrand {
  id: number;
  name: string;
}

export interface IModel {
  id: number;
  name: string;
}

export interface IParam {
  // name: string;
  // value: number;
  channel: string;
  color: string;
  label: string;
  name: string;
  is_active: boolean;
  order: number;
  value: number;
  equipment: number;
  alarm: any;
}

export interface IMonitoring {
  id: number;
  order: number;
  is_active: boolean;
  name: string;
  department: string;
  equipment: IEquipment[];
  patient: IPatient;
  params: IChannel[];
  typeView?: boolean;
}

// export interface IMonitoring {
//   id?: number;
//   name: string;
//   status: string;
//   department: number;
//   department_obj: IDepartment;
//   equipments: IEquipment[];
//   patient: IPatient;
//   is_active: boolean;
//   created_at?: string;
//   updated_at?: string;
//   typeView?: boolean;
// }

export interface IReorderParamsData {
  equipment: number;
  params: number[];
}

export interface IUpdateChannel {
  equipment: number;
  channel: number;
  color: number;
}
