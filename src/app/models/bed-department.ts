export interface IBedDepartment {
  isOpen?: boolean;
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
  bed: [
    {
      id: string;
      status: string;
      name: string;
      is_active: boolean;
      created_at: string;
      updated_at: string;
      department: number;
    }
  ];

  isEditing?: boolean;
  isConfirming?: boolean;
  isCanceling?: boolean;
}
