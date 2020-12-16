import read from "../common/read";
import { Solver } from "../types";

const solve: Solver = (filename) => {
  let s: Set<string>[][] = [];
  let acc: Set<string>[] = [];
  read(filename).forEach((l) => {
    if (l === "") {
      s.push(acc);
      acc = [];
      return;
    }
    acc.push(new Set(l.split("")));
  });
  const v = s
    .map((answer_set) =>
      answer_set.reduce((a, b) => new Set([...a].filter((x) => b.has(x))))
    )
    .map((a) => a.size)
    .reduce((a, b) => a + b);

  return v.toString();
};

export default solve;
