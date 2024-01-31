export interface IPagedReq<T> {
  results: T[];
  count: number;
  next: string;
  previous: string;
}

export interface IReqFilter {
  [param: string]: string | number | boolean;
}
