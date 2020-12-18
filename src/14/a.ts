import read from "../common/read";
import { Solver } from "../types";

type Mask = { type: "mask"; value: string };
type Write = { type: "write"; value: bigint; address: number };

type Operation = Mask | Write;

function isMask(o: Operation): o is Mask {
  return o.type === "mask";
}
export function applyMask(mask: string, value: bigint): bigint {
  const setOnes = BigInt("0b" + mask.replace(/X/g, "0"));
  const setZeros = BigInt("0b" + mask.replace(/X/g, "1"));
  let one = value | setOnes;
  let zero = one & setZeros;
  // console.log(setOnes.toString(2), setZeros.toString(2));
  // console.log("one", one.toString(2));
  // console.log("zero", zero.toString(2));
  return zero;
}

const solve: Solver = (filename: string): string => {
  const memory: { [address: number]: bigint } = {};
  let mask = "";
  const x = read(filename)
    .filter((l) => l !== "")
    .map((line) => {
      if (line.includes("mask")) {
        let [, value] = /mask = (.+)$/.exec(line) as RegExpMatchArray;
        return {
          type: "mask",
          value,
        } as Mask;
      } else {
        let [, address, value] = /mem\[(\d+)] = (\d+)/.exec(
          line
        ) as RegExpMatchArray;
        return {
          type: "write",
          address: parseInt(address, 10),
          value: BigInt(parseInt(value, 10)),
        } as Write;
      }
    });

  for (const o of x) {
    if (isMask(o)) {
      mask = o.value;
    } else {
      memory[o.address] = applyMask(mask, o.value);
    }
  }
  // console.log(memory);
  const nonZero = Object.values(memory).reduce((a, b) => a + b);

  return nonZero.toString();
};

export default solve;
