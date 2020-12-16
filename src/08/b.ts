import { Solver } from "../types";
import read from "../common/read";

type instruction = "acc" | "jmp" | "nop";
const solve: Solver = (filename) => {
  const instructions = read(filename)
    .filter((l) => l !== "")
    .map((l) => l.split(" ") as [string, string])
    .map<[instruction, number]>(([i, n]) => [
      i as instruction,
      parseInt(n, 10),
    ]);

  let index = 0;
  let accumulator = 0;
  const run = new Set<number>();

  while (true) {
    if (run.has(index)) break;
    run.add(index);
    const [operation, amount] = instructions[index];
    // noinspection FallThroughInSwitchStatementJS
    switch (operation) {
      case "jmp":
        index += amount;
        break;
      case "acc":
        accumulator += amount;
      case "nop":
      default:
        index += 1;
    }
  }

  return accumulator.toString();
};

export default solve;
