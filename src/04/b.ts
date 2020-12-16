import read from "../common/read";
import { Solver } from "../types";

function between(number: number, start: number, end: number) {
  return start <= number && number <= end;
}

function valid_year(year: string, start: number, end: number) {
  return year.length === 4 && between(parseInt(year, 10), start, end);
}

const solve: Solver = (filename) => {
  let records: string[] = [];
  let record = "";
  read(filename).forEach((line) => {
    if (line === "") {
      records.push(record);
      record = "";
    } else {
      if (record !== "") record += " ";
      record += line;
    }
  });

  let passports = records.map((p) =>
    Object.fromEntries(p.split(" ").map((i) => i.split(":")))
  );
  let valid = passports
    .filter((p) =>
      ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]
        .map((attr) => Reflect.has(p, attr))
        .reduce((previousValue, currentValue) => previousValue && currentValue)
    )
    .filter((p) => valid_year(p["byr"], 1920, 2002))
    .filter((p) => valid_year(p["iyr"], 2010, 2020))
    .filter((p) => valid_year(p["eyr"], 2020, 2030))
    .filter((p) => {
      const x = /(?<amt>\d+)(?<type>cm|in)/.exec(p["hgt"]);
      if (x === null) return false;
      if (x.groups?.type === "cm")
        return between(parseInt(x.groups?.amt, 10), 150, 193);
      if (x.groups?.type === "in")
        return between(parseInt(x.groups?.amt, 10), 59, 76);
    })
    .filter((p) => /#[0-9a-f]{6}/.exec(p["hcl"]))
    .filter((p) => /amb|blu|brn|gry|grn|hzl|oth/.exec(p["ecl"]))
    .filter((p) => p["pid"].length === 9);

  return valid.length.toString();
};
export default solve;
