export type Point = {
  amt: number;
  pv: number;
  uv: number;
  uvZScore?: number;
  pvZScore?: number;
}

export type Stop = {
  offset: string;
  stopColor: string;
}
