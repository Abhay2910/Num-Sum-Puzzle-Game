export type Coord = { r: number; c: number };

export type CellModel = {
  id: string;             // stable unique id
  value: number;
  r: number;
  c: number;
  removed?: boolean;      // removed after successful match
  locked?: boolean;       // optionally locked
};
