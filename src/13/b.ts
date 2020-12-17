import read from "../common/read";
import { Solver } from "../types";

const solve: Solver = (filename: string): string => {
  const x = read(filename).filter((l) => l !== "");
  const time = parseInt(x[0]);
  const schedules = x[1].split(",").map((l) => parseInt(l, 10));
  return "";
};

export default solve;
