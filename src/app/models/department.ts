import { IBed } from "./beds";

export interface IDepartmentData {
  id: number;
  name: string;
  bed: IBed[];
  created_at: string;
  updated_at: string;
  created_by: number;
}

export interface ICreateDepartment {
  name: string;
}
