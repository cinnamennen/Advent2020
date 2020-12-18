import read from "../common/read";
import { Solver } from "../types";

class Game {
  private last = -1;
  private turn = 0;
  private first = false;
  private spoken: Map<number, number>;
  private said: Set<number>;

  constructor() {
    this.said = new Set<number>();
    this.spoken = new Map<number, number>();
    return this;
  }

  say(w: number): void {
    this.first = !this.said.has(w);
    this.spoken.set(w, this.turn);
    this.last = w;
    this.said.add(w);
    this.turn++;
  }

  play() {
    while (this.turn < 10) {
      if (this.first) this.say(0);
      else {
        console.log(this.turn, this.spoken.get(this.last));
      }
    }
  }
}

const solve: Solver = (filename: string): string => {
  const x = read(filename)
    .filter((l) => l !== "")[0]
    .split(",")
    .map((i) => parseInt(i, 10));

  const g = new Game();
  x.forEach((l) => g.say(l));

  g.play();

  return "";
};

export default solve;
