import read from "../common/read";
import { Solver } from "../types";
import Point from "../common/point";

type Dimension = Map<number, Dimension | boolean>;

class SparseGrid {
  gX: Map<number, Map<number, Map<number, Map<number, boolean>>>> = new Map();

  private drillToW(x: number, y: number, z: number) {
    if (!this.gX.has(x)) this.gX.set(x, new Map());
    const gY = this.gX.get(x) as Dimension;
    if (!gY.has(y)) gY.set(y, new Map());
    const gZ = gY.get(y) as Dimension;
    if (!gZ.has(z)) gZ.set(z, new Map());
    return gZ.get(y) as Dimension;
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
    this.gX.forEach((gridY, x, mapX) => {
      gridY.forEach((gridZ, y, mapY) => {
        gridZ.forEach((gridW, z, mapZ) => {
          gridW.forEach((valueW, w, mapW) => {
            iterator(x, y, z, w, valueW);
          });
        });
      });
    });
  }
}

const solve: Solver = (filename: string): string => {
  let space = new SparseGrid();
  read(filename)
    .filter((l) => l !== "")
    .forEach((row, y) =>
      row.split("").forEach((value, x) => space.set(x, y, 0, 0, value === "#"))
    );

  return "";
};

export default solve;
