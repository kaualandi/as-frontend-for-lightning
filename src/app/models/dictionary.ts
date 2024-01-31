export interface IDictionaryData {
  id: number;
  parameter_to: {
    id: number;
    param: string;
    description: string;
  };
  parameter_from: string;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  model: number;
  created_by: number | null;
}

export interface ICreateDictionary {
  model: number;
  parameter_from: string;
  parameter_to: number;
  created_by: number;
}

export interface IUpdateDictionary {
  model: number;
  parameter_from: string;
  parameter_to: number;
  created_by: number;
}

export interface IParam {
  id: number;
  param: string;
  description: string;
}
