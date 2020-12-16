import a from "./a";

test("a examples", () => {
  expect(a("src/08/example1.txt")).toBe("5");
});

import b from "./b";
test("b examples", () => {
  expect(b("src/08/example1.txt")).toBe("8");
});
