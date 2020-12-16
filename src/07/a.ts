import read from "../common/read";
import { Solver } from "../types";
import { isDefined } from "ts-is-present";
import { range } from "lodash";

function getRules(filename: string) {
  const rules: {
    [key: string]: null | { amount: number; color: string }[];
  } = {};
  read(filename)
    .split("\n")
    .filter((v) => v !== "")
    .forEach((line) => {
      const x = /^(?<color>(?:\w+ ?)+?) bags contain (?<contents>.*)\./.exec(
        line
      );
      if (x === null) {
        console.log("COULD NOT PARSE", line);
        return;
      }
      let color = x.groups?.color;
      let contents = x.groups?.contents;
      if (contents === undefined) {
        console.log("NO CONTENTS", line);
        return;
      }
      if (color === undefined) {
        console.log("NO COLOR", line);
        return;
      }
      if (/no other bags/.exec(contents)) {
        rules[color] = null;
      } else {
        rules[color] = [
          ...contents.matchAll(
            /(?:(?<amount>\d+) (?<color>(?:\w+ ?)+?)) bags?/g
          ),
        ]
          .map(
            (o) => (o.groups as unknown) as { amount: string; color: string }
          )
          .map((o) => ({ ...o, amount: parseInt(o.amount, 10) }))
          .filter(isDefined);
      }
    });
  return rules;
}

const solve: Solver = (filename) => {
  const compiled: { [key: string]: { [color: string]: number } } = {};
  const rules = getRules(filename);
  let old_length = Object.keys(rules).length;
  while (Object.keys(rules).length > 0) {
    for (const [base_color, contents] of Object.entries(rules)) {
      if (contents === null) {
        compiled[base_color] = {};
        delete rules[base_color];
        break;
      }
      const includedColors = contents.map((c) => c.color);
      const missing = includedColors.filter((c) => !Reflect.has(compiled, c));
      if (missing.length === 0) {
        compiled[base_color] = contents
          .map(({ amount, color }) => {
            return range(amount)
              .map(() => ({
                [color]: 1,
                ...compiled[color],
              }))
              .reduce((previousValue, currentValue) =>
                Object.fromEntries(
                  Object.entries(currentValue).map(([k, v]) => [
                    k,
                    v + previousValue[k],
                  ])
                )
              );
          })
          .reduce((previousValue, currentValue) => ({
            ...previousValue,
            ...currentValue,
          }));
        delete rules[base_color];
        break;
      }
    }

    if (Object.keys(rules).length === old_length) {
      console.log("INFINITY DETECTED");
      break;
    } else {
      old_length = Object.keys(rules).length;
    }
  }
  // console.log(JSON.stringify(compiled, null, 1));
  return Object.values(compiled)
    .filter((b) => b?.["shiny gold"] > 0)
    .length.toString();
};

export default solve;
