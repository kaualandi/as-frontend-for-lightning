export interface IModel {
  isOpen?: boolean;
  brand: number | null;
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export type Timeout = ReturnType<typeof setTimeout> | null;

export interface IDialogActions {
  action: "yes" | "no";
}

export interface IDialogData {
  title: string;
  description: string;
  confirmText: string;
  cancellText: string;
}

export const dialogMessageConfig = {
  width: "90%",
  maxWidth: "350px",
  data: {
    title: "",
    description: "",
  },
};

export interface RerturApi<T> {
  results: T[];
  count: number;
  next: string;
  previous: string;
}
