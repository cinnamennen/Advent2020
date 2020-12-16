import read from "../common/read";

const solve = (filename: string, length: number): string => {
  const message = read(filename)
    .filter((l) => l !== "")
    .map((l) => parseInt(l, 10));

  let invalid = -1;
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
      invalid = toCheck;
    }
  }

  for (let i = 0; i < message.length; i++) {
    let value = 0;
    for (let distance = 0; distance < message.length - i; distance++) {
      value += message[i + distance];
      if (value > invalid) continue;
      if (value === invalid) {
        const range = message.slice(i, i + distance + 1);
        return (Math.max(...range) + Math.min(...range)).toString();
      }
    }
  }
  return "";
};

export default solve;
