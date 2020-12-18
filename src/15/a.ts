import read from "../common/read";
import { Solver } from "../types";

class Game {
  private last = -1;
  private turn = 0;
  private first = false;
  private spoken: Map<number, number>;
  private said: Set<number>;

  constructor(x: number[]) {
    this.said = new Set<number>();
    this.spoken = new Map<number, number>();
    x.forEach(this.speak);
  }

  say(w: number): void {
    let b = this.said.has(w);
    this.first = !b;
    this.speak(w);
    this.turn++;
  }

  private speak(w: number) {
    this.spoken.set(w, this.turn);
    this.last = w;
    this.said.add(w);
  }

  play() {
    for (; this.turn < 10; ) {
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

  const g = new Game(x);

  g.play();

  return "";
};

export default solve;
