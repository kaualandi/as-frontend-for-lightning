export interface ITrend {
  date: string;
  value: number;
}

export interface IParamTrends {
  param: string;
  order: number;
  unit: string;
  tendencies: ITrend[];
}
