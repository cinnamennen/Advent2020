import read from "../common/read";

const solve = (filename: string, length: number): string => {
  const message = read(filename)
    .filter((l) => l !== "")
    .map((l) => parseInt(l, 10));

  for (let i = length; i < message.length; i++) {
    const toCheck = message[i];
    let found = false;
    for (let x = i - length; x < i; x++) {
      if (found) break;
      for (let y = x + 1; y < i; y++) {
        if (message[x] + message[y] === toCheck) {
          found = true;
          break;
        }
      }
    }
    if (!found) {
      return toCheck.toString();
    }
  }
  return "";
};

export default solve;
