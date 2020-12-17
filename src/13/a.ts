import read from "../common/read";
import { Solver } from "../types";

const solve: Solver = (filename: string): string => {
  const x = read(filename).filter((l) => l !== "");
  const time = parseInt(x[0]);
  const schedules = x[1]
    .split(",")
    .filter((l) => l !== "x")
    .map((l) => parseInt(l, 10));
  const times = schedules.map((l) => Math.ceil(time / l) * l);
  const soonest = Math.min(...times);
  const route = schedules[times.indexOf(soonest)];
  const delay = soonest - time;
  return (route * delay).toString();
};

export default solve;
