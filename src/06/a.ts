import read from "../common/read";
import { Solver } from "../types";

const solve: Solver = (filename) => {
  let s = new Set<string>();
  let answers: Set<string>[] = [];
  read(filename)
    .split("\n")
    .forEach((line) => {
      if (line === "") {
        answers.push(s);
        s = new Set<string>();
        return;
      }
      line.split("").forEach((l) => s.add(l));
    });
  return answers
    .map((s) => s.size)
    .reduce((p, c) => p + c)
    .toString();
};

export default solve;
