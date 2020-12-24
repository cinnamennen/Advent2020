import read from "../common/read";
import { Solver } from "../types";
import Point from "../common/point";
import { Map } from "immutable";

const solve: Solver = (filename: string): string => {
  let space = Map<Point, boolean>();
  read(filename)
    .filter((l) => l !== "")
    .forEach((row, y) =>
      row
        .split("")
        .forEach(
          (value, x) => (space = space.set(new Point(x, y, 0), value === "#"))
        )
    );

  for (let i = 0; i < 6; i++) {
    const commands: [Point, boolean][] = [];
    space
      .keySeq()
      .map((p) => p.neighbors())
      .reduce((reduction, value) => [...reduction, ...value], [] as Point[])
      .forEach((p) => {
        const a = p
          .neighbors()
          .map((p) => space.get(p))
          .filter((value) => value === true).length;
        if (space.get(p) === true) {
          if (!(a == 2 || a == 3)) {
            commands.push([p, false]);
          }
        } else if (a == 3) commands.push([p, true]);
      });
    commands.forEach(([p, v]) => {
      space = space.set(p, v);
    });
  }

  return space
    .valueSeq()
    .filter((v) => v)
    .count()
    .toString();
};

export default solve;
