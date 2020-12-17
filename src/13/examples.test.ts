import a from "./a";

test("a examples", () => {
  expect(a(`${__dirname}/example1.txt`)).toBe("295");
});

import b from "./b";

test.each([
  ["1", "1068788"],
  ["2", "3417"],
  ["3", "754018"],
  ["4", "779210"],
  ["5", "1261476"],
  ["6", "1202161486"],
])("Example %i", (file, amount) => {
  expect(b(`${__dirname}/example${file}.txt`)).toBe(amount);
});
