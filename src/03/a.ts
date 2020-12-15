import read from "../common/read";
import { Solver } from "../types";
import World, { Y } from "../common/world";
import Point from "../common/point";

const solve: Solver = (filename) => {
  const w = new World();
  let position = new Point(0, 0);

  function gen_world(offset: number = 0) {
    read(filename)
      .split("\n")
      .forEach((row, y) =>
        row
          .split("")
          .forEach((value, x) => w.set(new Point(x + offset, y), value))
      );
  }

  gen_world();
  let count = 0;
  const y = w.maxY;
  const x = w.maxX;
  while (position.y < y) {
    position = position.add(new Point(3, 1));
    position = position.mod(new Point(x + 1, position.y + 1));
    if (w.world.get(position) === "#") count += 1;
  }
  return count.toString();
};
export default solve;
