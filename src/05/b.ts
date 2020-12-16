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

export function getSeat(input: string): number {
  const x = input.split("");
  return getRow(x.splice(0, 7).join("")) * 8 + getCol(x.join(""));
}

const solve: Solver = (filename) => {
  const seats: { [k: number]: number } = {};
  read(filename)
    .map(getSeat)
    .forEach((id) => {
      seats[id] = 1;
    });
  const ids = Object.keys(seats).map((i) => parseInt(i, 10));
  for (let i = Math.min(...ids); i <= Math.max(...ids); i++) {
    if (seats[i] === undefined && seats[i + 1] === 1 && seats[i - 1] === 1) {
      return i.toString();
    }
  }
  return "unknown";
};

export default solve;
