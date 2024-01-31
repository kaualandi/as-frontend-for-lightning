export type TNumberOfMonitors = "4" | "8" | "16" | "32" | "64" | "-/-";

export type TTimeConfig = "24h" | "12h";

export type TLanguage = "Português" | "Inglês";

export type TDataStorage = "120h" | "360h" | "720h" | "2160h" | "4320h" | "-/-";

export type TDataFormat = "dd/MM/yyyy" | "yyyy/MM/dd" | "MM/dd/yyyyy";

export interface IVolume {
  volume: number;
  v_min: number;
  v_max: number;
}

export interface IDefaultSettings {
  id: number;
  language: string[];
  monitor_exibition: string[];
  date_storage_format: string[];
  hour_format: string[];
  date_format: string[];
  created_at: string;
  updated_at: string;
  hospital: string[];
}
export interface ISystemParameters {
  id: number;
}
export interface IUserSystemParameters {
  id: number;
}

// export interface ISystemSettings {
//   created_at: string;
//   user: string;
//   language: TLanguage;
//   monitor_exibition: TNumberOfMonitors;
//   data_storage: TDataStorage;
//   data_format: TDataFormat;
//   hour_format: TTimeConfig;
//   volume_config: number;
//   is_allowed: boolean;
//   system_date: string;
// }

export interface IDefaultSystem {
  id: number;
  data_storage: string;
  hour: string;
  date: string;
  last_update: string;
  user_id_last_update: number;
  hospital: string;
}

export interface ISystemSettings {
  id: number;
  user: number;
  data_format: string;
  hour_format: string;
  language: string;
  monitor_exibition: number;
  volume: number;
  created_at: string;
  updated_at: string;
  system_settings: IDefaultSystem;
}
export interface IDefaultSystemSettings {
  id: number;
  user: number;
  data_format: string;
  hour_format: string;
  language: string;
  monitor_exibition: number;
  volume: number;
  created_at: string;
  updated_at: string;
  system_settings: IDefaultSystem;
}
