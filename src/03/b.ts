import read from "../common/read";
import { Solver } from "../types";
import World from "../common/world";
import Point from "../common/point";

const solve: Solver = (filename) => {
  const w = new World();

  read(filename).forEach((row, y) =>
    row.split("").forEach((value, x) => w.set(new Point(x + 0, y), value))
  );

  function test_slope(slope: Point) {
    let position = new Point(0, 0);

    let count = 0;
    const y = w.maxY;
    const x = w.maxX;
    while (position.y < y) {
      position = position.add(slope);
      position = position.mod(new Point(x + 1, position.y + 1));
      if (w.world.get(position) === "#") count += 1;
    }
    return count;
  }

  return [
    new Point(1, 1),
    new Point(3, 1),
    new Point(5, 1),
    new Point(7, 1),
    new Point(1, 2),
  ]
    .map((p) => test_slope(p))
    .reduce((previousValue, currentValue) => previousValue * currentValue)
    .toString();
};
export default solve;
