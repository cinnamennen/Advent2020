import read from "../common/read";
import { Solver } from "../types";
import Point from "../common/point";

const directions = [
  new Point(1, 0),
  new Point(0, -1),
  new Point(-1, 0),
  new Point(0, 1),
];
const cardinal = ["E", "S", "W", "N"];
type actions = "N" | "S" | "E" | "W" | "L" | "R" | "F";

function isCardinal(a: actions): a is "N" | "S" | "E" | "W" {
  return cardinal.includes(a);
}

function isTurn(a: actions): a is "L" | "R" {
  return !isCardinal(a) && a !== "F";
}

const solve: Solver = (filename: string): string => {
  let facing = 0;
  let position = new Point(0, 0);
  const x = read(filename)
    .filter((l) => l !== "")
    .map((line) => line.match(/(.)(\d+)/) as RegExpMatchArray)
    .map<[actions, number]>(([, dir, amt]) => [dir as actions, parseInt(amt)])
    .forEach(([action, amt]) => {
      let direction: Point;
      if (isCardinal(action)) {
        direction = directions[cardinal.indexOf(action)];
      } else if (isTurn(action)) {
        const swing = (amt / 90) * (action === "L" ? -1 : 1);
        facing += swing;
        while (facing < 0) {
          facing += 4;
        }
        facing = facing % directions.length;
        return;
      } else {
        direction = directions[facing];
      }
      let point = direction.mul(amt);
      position = position.add(point);
    });
  return position.zero_distance().toString();
};

export default solve;
