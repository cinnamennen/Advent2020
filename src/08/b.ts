import { Solver } from "../types";
import read from "../common/read";

type instruction = "acc" | "jmp" | "nop";

class Computer {
  private index: number;
  private accumulator: number;
  private seen: Set<number>;
  readonly instructions: [instruction, number][];

  constructor(instructions: [instruction, number][]) {
    this.instructions = instructions;
    this.index = 0;
    this.accumulator = 0;
    this.seen = new Set<number>();
  }

  reset() {
    this.index = 0;
    this.accumulator = 0;
    this.seen = new Set<number>();
  }

  run() {
    while (!this.seen.has(this.index)) {
      if (this.index === this.instructions.length) return this.accumulator;
      if (this.index >= this.instructions.length) return null;

      this.seen.add(this.index);
      const [operation, amount] = this.instructions[this.index];

      // noinspection FallThroughInSwitchStatementJS
      switch (operation) {
        case "jmp":
          this.index += amount;
          break;
        case "acc":
          this.accumulator += amount;
        case "nop":
        default:
          this.index += 1;
      }
    }
    return null;
  }
}

const solve: Solver = (filename) => {
  const instructions = read(filename)
    .filter((l) => l !== "")
    .map((l) => l.split(" ") as [string, string])
    .map<[instruction, number]>(([i, n]) => [
      i as instruction,
      parseInt(n, 10),
    ]);
  const c = new Computer(instructions);

  const r = [];
  for (let i = 0; i < instructions.length; i++) {
    if (c.instructions[i][0] === "acc") continue;
    c.reset();
    c.instructions[i][0] = c.instructions[i][0] === "jmp" ? "nop" : "jmp";
    const v = c.run();
    if (v !== null) return v.toString();
    c.instructions[i][0] = c.instructions[i][0] === "jmp" ? "nop" : "jmp";
  }
  return "";
};

export default solve;
