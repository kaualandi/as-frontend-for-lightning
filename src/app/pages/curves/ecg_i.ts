export interface Curve {
  x: number;
  y: number;
}

export interface ECG {
  ecg_i: Curve[];
  resp: Curve[];
  pleth: Curve[];
}
