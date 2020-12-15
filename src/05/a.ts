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
  return Math.max(...read(filename).split("\n").map(getSeat)).toString();
};

export default solve;
