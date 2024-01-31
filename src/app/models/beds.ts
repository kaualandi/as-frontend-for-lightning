import { IEquipment } from "./equipment";

export type TState =
  | "ATIVO"
  | "DESATIVADO"
  | "ALARMANDO"
  | "FALHA"
  | "SILENCIADO";

// Temporário
export type TAlarmPriority = "LOW" | "MEDIUM" | "HIGH";

export interface IDepartment {
  id: number;
  name: string;
  updated_at?: string;
  created_at?: string;
  created_by?: string;
}

export interface IBedData {
  id: number;
  department_obj: IDepartment;
  department:{
id: number,
name: string
  };
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // department: string;
  status: TState;
  beds: string;
}

export interface ICreateBed {
  name: string;
  department: number;
}

export interface IPatient {
  id: number;
  name: string;
  doctor_name: string;
}

export interface IBed {
  id?: number;
  name: string;
  status: string;
  department: number;
  department_obj: IDepartment;
  equipments: IEquipment[];
  patient: IPatient;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  typeView?: boolean;
}
