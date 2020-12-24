import read from "../common/read";
import { Solver } from "../types";
import { isDefined } from "ts-is-present";

type Dimension = Map<number, Dimension | boolean>;
type W = Map<number, boolean>;
type Z = Map<number, W>;
type Y = Map<number, Z>;
type X = Map<number, Y>;

class SparseGrid {
  gX: X = new Map();

  private drillToW(x: number, y: number, z: number) {
    let gY = this.gX.get(x);
    if (!isDefined(gY)) {
      gY = new Map();
      this.gX.set(x, gY);
    }
    let gZ = gY.get(y);
    if (!isDefined(gZ)) {
      gZ = new Map();
      gY.set(x, gZ);
    }
    let gW = gZ.get(z);
    if (!isDefined(gW)) {
      gW = new Map();
      gZ.set(x, gW);
    }
    return gW;
  }

  get(x: number, y: number, z: number, w: number): boolean {
    const gW = this.drillToW(x, y, z);
    if (!gW.has(w)) gW.set(w, false);
    return gW.get(w) as boolean;
  }

  set(x: number, y: number, z: number, w: number, v: boolean): void {
    const gW = this.drillToW(x, y, z);
    gW.set(w, v);
  }

  iterate(
    iterator: (
      x: number,
      y: number,
      z: number,
      w: number,
      value: boolean
    ) => void
  ) {
    let cnt = 0;

    this.gX.forEach((gridY) => {
      gridY.forEach((gridZ) => {
        gridZ.forEach((gridW) => {
          gridW.forEach((valueW) => {
            cnt += valueW ? 1 : 0;
          });
        });
      });
    });
  }
}

function countNeighbours(
  grid: SparseGrid,
  ax: number,
  ay: number,
  az: number,
  aw: number,
  maxCount = 4
) {
  let neighbours = 0;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        for (let w = -1; w <= 1; w++) {
          if (x == 0 && y == 0 && z == 0 && w == 0) continue;

          if (grid.get(ax + x, ay + y, az + z, aw + w)) {
            neighbours++;

            if (neighbours >= maxCount) return neighbours;
          }
        }
      }
    }
  }

  return neighbours;
}

function simulate(step: number, grid: SparseGrid): SparseGrid {
  let newGrid = new SparseGrid();
  for (let x = -step; x < 8 + step; x++) {
    for (let y = -step; y < 8 + step; y++) {
      for (let z = -step; z <= step; z++) {
        for (let w = -step; w <= step; w++) {
          let value = grid.get(x, y, z, w);
          if (value) {
            let neighbours = countNeighbours(grid, x, y, z, w);
            value = neighbours == 2 || neighbours == 3;
          } else {
            let neighbours = countNeighbours(grid, x, y, z, w);
            value = neighbours == 3;
          }

          newGrid.set(x, y, z, w, value);
        }
      }
    }
  }

  return newGrid;
}

function countActive(grid: SparseGrid) {
  let cnt = 0;
  grid.iterate((x, y, z, w, value) => (cnt += value ? 1 : 0));
  return cnt;
}

const solve: Solver = (filename: string): string => {
  let space = new SparseGrid();
  read(filename)
    .filter((l) => l !== "")
    .forEach((row, y) =>
      row.split("").forEach((value, x) => space.set(x, y, 0, 0, value === "#"))
    );
  let i = 0;
  space = simulate(++i, space);
  space = simulate(++i, space);
  space = simulate(++i, space);
  space = simulate(++i, space);
  space = simulate(++i, space);
  space = simulate(++i, space);

  console.log(space);
  return "";
};

export default solve;
