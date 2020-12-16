import { readFileSync } from "fs";

export default (filename: string) => {
  return readFileSync(filename, "ascii").split("\n");
};
