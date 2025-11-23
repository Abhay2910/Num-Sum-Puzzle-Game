import { CellModel, Coord } from './types';
import { v4 as uuidv4 } from 'uuid';

// generate an N x N grid with random small integers
export function generateGrid(n: number, maxValue = 9): CellModel[] {
  const result: CellModel[] = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      result.push({
        id: uuidv4(),
        value: Math.floor(Math.random() * maxValue) + 1,
        r,
        c,
        removed: false,
      });
    }
  }
  return result;
}

export function indexOfCoord(grid: CellModel[], coord: Coord) {
  return grid.findIndex((g) => g.r === coord.r && g.c === coord.c);
}

export function areAdjacent(a: Coord, b: Coord) {
  const dr = Math.abs(a.r - b.r);
  const dc = Math.abs(a.c - b.c);
  return (dr === 1 && dc === 0) || (dr === 0 && dc === 1);
}
