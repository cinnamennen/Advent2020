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
  let waypoint = new Point(10, 1);
  const x = read(filename)
    .filter((l) => l !== "")
    .map((line) => line.match(/(.)(\d+)/) as RegExpMatchArray)
    .map<[actions, number]>(([, dir, amt]) => [dir as actions, parseInt(amt)])
    .forEach(([action, amt]) => {
      let direction: Point;
      if (isCardinal(action)) {
        direction = directions[cardinal.indexOf(action)];
        waypoint = waypoint.add(direction.mul(amt));
      } else if (isTurn(action)) {
        let relative = waypoint.sub(position);
        let swing = (amt / 90) * (action === "L" ? -1 : 1);
        let y: number, x: number;

        while (swing >= 4) {
          swing -= 4;
        }
        while (swing < 0) {
          swing += 4;
        }
        switch (swing as 0 | 1 | 2 | 3) {
          case 0:
            break;
          case 2:
            relative = relative.mul(-1);
            break;
          case 1:
            [y, x] = relative;
            relative = new Point(x, -y);
            break;
          case 3:
            [y, x] = relative;
            relative = new Point(-x, y);
            break;
        }
        waypoint = relative.add(position);
      } else {
        const movement = waypoint.sub(position).mul(amt);
        position = position.add(movement);
        waypoint = waypoint.add(movement);
      }
      // console.log(`ship ${position}, waypoint ${waypoint}`);
    });
  return position.zero_distance().toString();
};

export default solve;
