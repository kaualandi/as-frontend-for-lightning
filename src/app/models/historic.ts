export interface IHistoric {
  id: number;
  param: string;
  priority: string;
  name: string;
  min: number;
  max: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  equipment: number;
  patient: { id: number; name: string };
  bed: string;
  department: string;
  type: string;
}
