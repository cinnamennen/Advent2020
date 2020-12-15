import read from "../common/read";
import { Solver } from "../types";

export function getRow(input: string): number {
  let lower = 0;
  let upper = 127;
  input.split("").forEach((letter) => {
    const mid = (upper - lower) / 2 + lower;
    const lowMid = Math.floor(mid);
    const highMid = Math.ceil(mid);
    if (letter === "F") {
      upper = lowMid;
    } else if (letter === "B") {
      lower = highMid;
    }
  });
  return lower;
}

export function getCol(input: string): number {
  let lower = 0;
  let upper = 7;
  input.split("").forEach((letter) => {
    const mid = (upper - lower) / 2 + lower;
    const lowMid = Math.floor(mid);
    const highMid = Math.ceil(mid);
    if (letter === "L") {
      upper = lowMid;
    } else if (letter === "R") {
      lower = highMid;
    }
  });
  return lower;
}

export function getSeat(input: string): number[] {
  const x = input.split("");
  return [getRow(x.splice(0, 7).join("")), getCol(x.join(""))];
}

const solve: Solver = (filename) => {
  const seats: { [k: number]: { [k: number]: number } } = {};
  read(filename)
    .split("\n")
    .map(getSeat)
    .forEach(([row, col]) => {
      if (seats[row] === undefined) seats[row] = {};
      seats[row][col] = 1;
    });
  const interesting: [number, { [k: number]: number }][] = Object.entries(seats)
    .filter(([, value]) => Object.keys(value).length !== 8)
    .map(([key, value]) => [parseInt(key, 10), value]);
  interesting.forEach(([row, c]) =>
    Object.entries(c).forEach(([sCol, val]) => {
      const col = (sCol as unknown) as number;
      const neighboring = [
        seats[row + 1]?.[col],
        seats[row - 1]?.[col],
        seats[row]?.[col + 1],
        seats[row]?.[col - 1],
      ];
      console.log(neighboring);
    })
  );
  console.log(interesting);
  return "-1";
};

export default solve;
