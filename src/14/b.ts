import read from "../common/read";
import { Solver } from "../types";

type Mask = { type: "mask"; value: string };
type Write = { type: "write"; value: bigint; address: bigint };

type Operation = Mask | Write;

function isMask(o: Operation): o is Mask {
  return o.type === "mask";
}

export function applyMask(mask: string, value: bigint): bigint[] {
  if (!mask.includes("X")) {
    return [];
  }
  const setOnes = BigInt("0b" + mask.replace(/X/g, "0"));
  let one = value | setOnes;
  return [];
}

function genAddresses(mask: string): bigint[] {
  if (!mask.includes("X")) return [BigInt("0b" + mask)];
  return [
    ...genAddresses(mask.replace("X", "0")),
    ...genAddresses(mask.replace("X", "1")),
  ];
}

const solve: Solver = (filename: string): string => {
  let memory: { [address: string]: bigint } = {};
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
          address: BigInt(parseInt(address, 10)),
          value: BigInt(parseInt(value, 10)),
        } as Write;
      }
    });

  for (const o of x) {
    if (isMask(o)) {
      mask = o.value;
    } else {
      const stringMask = mask.split("");
      const stringValue = o.address
        .toString(2)
        .padStart(mask.length, "0")
        .split("");
      const generator = stringMask
        .map((c, index) => (c === "0" ? stringValue[index] : c))
        .join("");

      const addresses = Object.fromEntries(
        genAddresses(generator).map((a) => [a.toString(2), o.value])
      );
      memory = { ...memory, ...addresses };
      // memory[o.address] = applyMask(mask, o.value);
    }
  }
  const nonZero = Object.values(memory).reduce((a, b) => a + b);

  return nonZero.toString();
};

export default solve;
