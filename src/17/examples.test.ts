import a from "./a";

test("a examples", () => {
  expect(a(`${__dirname}/example1.txt`)).toBe("112");
});
import b from "./b";

test("b examples", () => {
  expect(b(`${__dirname}/example1.txt`)).toBe("848");
});
