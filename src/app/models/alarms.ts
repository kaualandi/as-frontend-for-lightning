export interface IAlarm {
  id: number;
  priority: "LOW" | "MEDIUM" | "HIGH";
  source: string;
  name: string;
  min: number;
  max: number;
}

export interface IParam {
  name: string;
  alarm: IAlarm;
  label: string;
  value: number;
  equipment: number;
  is_active: boolean;
  param: string;
  timerAlarm?: string;
}
export interface IAlarmResults {
  isOpen?: boolean;
  id: number;
  equipment_obj: {
    id: number;
    status: string;
    ip: string;
    port: string;
    mac_address: string;
    created_at: string;
    updated_at: string;
    type: number;
    brand: number;
    model: number;
    protocol: number;
    department: number;
    created_by: number;
  };
  equipment: {
    id: number;
    model: string;
    brand: string;
  };
  param_obj: {
    id: number;
    param: string;
    description: string;
  };
  priority: string;
  name: string;
  min: number;
  max: number;
  created_at: string;
  updated_at: string;
  param: {
    id: number;
    name: string;
  };
  source: string;
}

export interface ICreateAlarm {
  priority: string;
  name: string;
  min: number;
  max: number;
  equipment: number;
  param: number;
}
export interface IAlarmList {
  id?: number;
  param: {
    id?: number;
    name?: string;
    value?: number;
  };
  priority: "LOW" | "MEDIUM" | "HIGH";
  source: "EQUIPMENT" | string;
  name?: string;
  min: number;
  max: number;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  department: string;
  bed: string;
  updated_at: string;
  equipment: {
    id?: number;
    model: string;
    brand: string;
  };
  patient: {
    id?: number;
    name?: string;
    doctor_name?: string;
  };
  params: IParam[];
  file_audio?: any;
  timer?: number | undefined;
  timerAlarm?: number | NodeJS.Timeout;
  alarmSounding: "play" | "pause" | "destroy";
}

export interface IParamsByEquipement {
  id_param_default: any;
  alarms: {
    created_at: string;
    equipment: number;
    id: number;
    is_active: boolean;
    is_deleted: boolean;
    max: number;
    min: number;
    name: string;
    param: number;
    priority: string;
    source: string;
    updated_at: string;
  }[];
  id: number;
  label: string;
  order: number;
  is_active: true;
  is_deleted: false;
  created_at: string;
  updated_at: string;
  channel: number;
  param: number;
  equipment: number;
  name?: string;
}

export interface IAlarmingsTimeout {
  [i: number]: NodeJS.Timeout;
}
