import read from "../common/read";
import { Solver } from "../types";

type Rules = { [key: string]: number[][] };

// function validTicket(
//   rules: Array<[string, number[][]]>,
//   tickets: number[]
// ): boolean {
//   if (tickets.length !== rules.length) throw Error("Need matching lengths");
//   if (tickets.length === 0 && rules.length === 0) return true;
//   for (let ticketIndex = 0; ticketIndex < tickets.length; ticketIndex++) {
//     let ticket = tickets[ticketIndex];
//     for (let ruleIndex = 0; ruleIndex < rules.length; ruleIndex++) {
//       let [name, ranges] = rules[ruleIndex];
//       const v = ranges
//         .map(([low, high]) => low <= ticket && ticket <= high)
//         .reduce((a, b) => a || b);
//       if (v) {
//         if (
//           validTicket(
//             [...rules.slice(0, ruleIndex), ...rules.slice(ruleIndex + 1)],
//             [
//               ...tickets.slice(0, ticketIndex),
//               ...tickets.slice(ticketIndex + 1),
//             ]
//           )
//         ) {
//           return true;
//         }
//       }
//     }
//   }
//   return false;
// }
function validTicket(rules: Array<[string, number[][]]>, tickets: number[]) {
  return tickets
    .filter(
      (ticket) =>
        !rules
          .map(([name, ranges]) => {
            return ranges
              .map(([low, high]) => {
                return low <= ticket && ticket <= high;
              })
              .reduce((a, b) => a || b);
          })
          .reduce((a, b) => a || b)
    )
    .reduce((a, b) => a + b, 0);
}

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
    rules[name] = o.split(" or ").map((w) => w.split("-").map(Number));
  });

  return nearby
    .map((n) => validTicket(Object.entries(rules), n))
    .reduce((a, b) => a + b, 0)
    .toString();
};

export default solve;
