export interface IGenerealAccess {
  dashboard: boolean;
  beds: boolean;
  alarms: boolean;
}

export interface ILevelAcess {
  create: boolean;
  delete: boolean;
  name: string;
  page: number;
  read: boolean;
  router: string;
  update: boolean;
  config: boolean;
}
export interface IManagement {
  equipment: boolean;
  users: boolean;
}
export interface IClinicalAccess {
  patient: boolean;
  historic: boolean;
}
export interface IPatientsDisplay {
  patient_display: boolean;
  patient_edit: boolean;
}
export interface ISettingsDisplay {
  bed_settings: boolean;
  equipment_settings: boolean;
}

export interface IUserPemition {
  page?: number;
  create?: boolean;
  read?: boolean;
  update?: boolean;
  delete?: boolean;
  config?: boolean;
}
export interface ILevelAccess {
  create?: boolean;
  created_at?: string;
  delete?: boolean;
  id?: number;
  level?: string;
  page?: number;
  read?: boolean;
  config?: boolean;
  update?: boolean;
  updated_at?: string;
  router?: string;
  name?: string;
}
export interface IPermitions {
  id: number;
  created_at: string;
  level_access?: ILevelAccess[];
  route?: string;
  name?: string;
  update_at?: string;
}

export interface ILevelAccessUser {
  page: number;
  name: string;
  router: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  config: boolean;
}

export interface IUser {
  id: number;
  type_user_obj: any;
  last_login: string | null;
  email: string;
  name: string;
  username: string;
  is_active: boolean;
  is_admin: boolean;
  token_notification: string | null;
  forgot_password_hash: string | null;
  forgot_password_expire: string | null;
  created_at: string | null;
  updated_at: string | null;
  type_user: string;
  level: "ADMINISTRADOR" | "CLÍNICO" | "OPERADOR";
  level_access: ILevelAcess[];
  department: string;
  phone: string;
  phone_extension: string;
  function: string;
  password: string;
  token: string;

  // level_access?: ILevelAccess[];
}

export interface IToken {
  token: string;
}

export interface Ilevel {
  id: number;
  level: string;
}

export interface IFunction {
  id: number;
  function: string;
}
