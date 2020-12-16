import read from "../common/read";
import { Solver } from "../types";

function findHighest(voltage: number, adapters: number[]): null | number[] {
  if (adapters.length === 0) return [];
  for (let i = 0; i < adapters.length; i++) {
    let adapter = adapters[i];
    if (
      adapter - 1 === voltage ||
      adapter - 2 === voltage ||
      adapter - 3 === voltage
    ) {
      // Plug it in
      let toTry = adapters.slice();
      toTry.splice(i, 1);
      const testAdapter = findHighest(adapter, toTry);
      if (testAdapter !== null) {
        return [adapter, ...testAdapter];
      }
    }
  }
  return null;
}

const solve: Solver = (filename: string): string => {
  const message = read(filename)
    .filter((l) => l !== "")
    .map((l) => parseInt(l, 10));
  message.sort((a, b) => a - b);
  // console.log(findHighest(0, message));
  const x = message.map((value, index, array) => {
    if (index === 0) return value;
    return value - array[index - 1];
  });
  return (
    x.filter((x) => x === 1).length *
    (x.filter((x) => x === 3).length + 1)
  ).toString();
};

export default solve;
