import read from "../common/read";
import { Solver } from "../types";

const solve: Solver = (filename: string): string => {
  const words = read(filename)
    .filter((l) => l !== "")[0]
    .split(",")
    .map((i) => parseInt(i, 10));

  let number = 30000000;
  const said = Array(number);
  for (let i = 0; i < words.length - 1; i++) {
    let word = words[i];
    said[word] = i + 1;
  }
  let current_spoken = words[words.length - 1];

  for (let turn = words.length; turn < number; turn++) {
    if (!said[current_spoken]) {
      said[current_spoken] = turn;
      current_spoken = 0;
    } else {
      let last_turn_was_spoken = said[current_spoken];
      said[current_spoken] = turn;
      current_spoken = turn - last_turn_was_spoken;
    }
  }

  return current_spoken.toString();
};

export default solve;
