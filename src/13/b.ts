import read from "../common/read";
import { Solver } from "../types";

function inverse(a: number, n: number): number {
  let t = 0;
  let newt = 1;
  let r = n;
  let newr = a;
  while (newr != 0) {
    const quotient = Math.floor(r / newr);
    [t, newt] = [newt, t - quotient * newt];
    [r, newr] = [newr, r - quotient * newr];
  }
  if (r > 1) {
    throw "a is not invertible";
  }
  if (t < 0) t += n;
  return t;
}

function crt(a: number[], m: number[]): number {
  const M = m.reduce((a, b) => a * b);
  const Mi = m.map((m) => M / m);
  const yi = m.map((m, index) => inverse(Mi[index], m));
  let numbers = a.map(
    (a, index) => BigInt(a) * BigInt(Mi[index]) * BigInt(yi[index])
  );
  const x = numbers.reduce((a, b) => a + b);

  let number = x % BigInt(M);
  return Number(number);
}

const solve: Solver = (filename: string): string => {
  const schedules = read(filename)
    .filter((l) => l !== "")[1]
    .split(",")
    .map((l) => parseInt(l, 10))
    .map((m, a) => [m, m - a])
    .filter(([m]) => !Number.isNaN(m));
  const a = schedules.map(([, a]) => a);
  const m = schedules.map(([m]) => m);
  return crt(a, m).toString();
};

export default solve;
