import read from "../common/read";
import { Solver } from "../types";

const trib = [1, 1, 2, 4, 7, 13, 24, 44, 81, 149];
const solve: Solver = (filename: string): string => {
  const adapters = read(filename)
    .filter((l) => l !== "")
    .map((l) => parseInt(l, 10));
  adapters.sort((a, b) => a - b);
  return adapters
    .map((value, index, array) => {
      if (index === 0) return value;
      return value - array[index - 1];
    })
    .map((c) => (c === 1 ? 1 : -3))
    .reduce<number[]>((previousValue, currentValue) => {
      if (
        Math.sign(previousValue[previousValue.length - 1]) ===
        Math.sign(currentValue)
      ) {
        previousValue[previousValue.length - 1] += 1;
        return previousValue;
      } else {
        return [...previousValue, Math.sign(currentValue)];
      }
    }, [])
    .filter((v) => Math.sign(v) === 1)
    .map((v) => trib[v])
    .reduce((previousValue, currentValue) => previousValue * currentValue)
    .toString();
};

export default solve;
