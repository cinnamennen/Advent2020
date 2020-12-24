import read from "../common/read";
import { Solver } from "../types";
import { transpose } from "mathjs";
import { isFilled } from "ts-is-present";

type Range = [number, number];
type Ranges = Range[];
type Rules = { [key: string]: Ranges };

function possibleTicket(rules: Array<[string, number[][]]>, tickets: number[]) {
  return (
    tickets.filter(
      (ticket) =>
        !rules
          .map(([_, ranges]) => {
            return ranges
              .map(([low, high]) => {
                return low <= ticket && ticket <= high;
              })
              .reduce((a, b) => a || b);
          })
          .reduce((a, b) => a || b)
    ).length === 0
  );
}

function between(number: number, low: number, high: number): boolean {
  return low <= number && number <= high;
}

function betweenAny(number: number, ranges: Ranges): boolean {
  return ranges
    .map((range) => between(number, ...range))
    .reduce((a, b) => a || b);
}

function allInRange(values: number[], ranges: Ranges): boolean {
  return values
    .map((value) => betweenAny(value, ranges))
    .reduce((a, b) => a && b);
}

function validMapping(
  rules: Array<[string, number[][]]>,
  tickets: number[][],
  order: (number | null)[]
) {}

const solve: Solver = (filename: string): string => {
  const rules: Rules = {};
  const constraints = read(filename).filter((l) => l !== "");
  const mine = constraints.splice(constraints.indexOf("your ticket:")).slice(1);
  let nearby = mine
    .splice(mine.indexOf("nearby tickets:"))
    .slice(1)
    .map((t) => t.split(",").map(Number));
  const ticket = mine[0].split(",").map(Number);
  constraints.forEach((c) => {
    const [name, o] = c.split(": ");
    rules[name] = o.split(" or ").map((w) => w.split("-").map(Number) as Range);
  });
  const good = nearby.filter((n) => possibleTicket(Object.entries(rules), n));
  const inverted = transpose(good);
  let tries: number[][] = Object.values(rules).map((ranges) =>
    inverted
      .map((tickets, index) => (allInRange(tickets, ranges) ? index : null))
      .filter(isFilled)
  );
  let possibilities = tries.reduce<[string, number[]][]>(
    (previousValue, currentValue, currentIndex) => {
      let newVar: [string, number[]] = [
        Object.keys(rules)[currentIndex],
        currentValue,
      ];
      return [...previousValue, newVar];
    },
    []
  );
  const assignments: { [key: string]: number } = {};
  while (possibilities.length > 0) {
    let clear: number[] = [];
    possibilities
      .filter(([, options]) => options.length === 1)
      .forEach(([name, options]) => {
        clear.push(options[0]);
        assignments[name] = options[0];
      });
    possibilities = possibilities
      .map<[string, number[]]>(([name, options]) => [
        name,
        options.filter((o) => !clear.includes(o)),
      ])
      .filter(([name, o]) => !Object.keys(assignments).includes(name));
  }

  return Object.entries(assignments)
    .filter(([key]) => key.includes("departure"))
    .map(([, v]) => v)
    .map((i) => ticket[i])
    .reduce((a, b) => a * b)
    .toString();
};

export default solve;
