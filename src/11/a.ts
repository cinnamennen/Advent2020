import read from "../common/read";
import { Solver } from "../types";
import World, { Y } from "../common/world";
import Point from "../common/point";
import { isDefined } from "ts-is-present";

type Chair = "L" | "#";
type Data = "." | Chair;

function isChair(v: Data): v is Chair {
  return v !== ".";
}

function getPredicate(entry: [Point, Data]): entry is [Point, Chair] {
  const [p, d] = entry;
  return isChair(d);
}

function iterate(w: World<Data>) {
  [
    ...w.world
      .entrySeq()
      .filter<[Point, Chair]>(getPredicate)
      .map<[Point, Chair, Data[]]>(([point, data]) => [
        point,
        data,
        point.neighbors().map((p) => w.world.get(p) || "."),
      ])
      .map<[Point, Chair] | undefined>(([point, data, adjacent]) => {
        if (data === "L" && adjacent.filter((d) => d === "#").length === 0) {
          return [point, "#"];
        } else if (
          data === "#" &&
          adjacent.filter((d) => d === "#").length >= 4
        ) {
          return [point, "L"];
        }
        return undefined;
      })
      .filter<[Point, Chair]>(isDefined),
  ].forEach(([point, data]) => w.set(point, data));
}

const solve: Solver = (filename: string): string => {
  const w = new World<Data>();
  read(filename)
    .filter((l) => l !== "")
    .forEach((line, y) =>
      line.split("").forEach((char, x) => {
        w.set(new Point(x, y), char as Data);
      })
    );
  let old = "";
  let current = w.worldToString();
  do {
    old = current;
    iterate(w);
    current = w.worldToString();
  } while (old !== current);

  return w.world
    .valueSeq()
    .filter((v) => v === "#")
    .count()
    .toString();
};

export default solve;
