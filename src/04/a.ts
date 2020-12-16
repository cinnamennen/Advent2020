import read from "../common/read";
import { Solver } from "../types";

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
  let valid = passports.filter((p) =>
    ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]
      .map((attr) => Reflect.has(p, attr))
      .reduce((previousValue, currentValue) => previousValue && currentValue)
  );

  return valid.length.toString();
};
export default solve;
