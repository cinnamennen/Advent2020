import a from "./a";

test("a examples", () => {
  expect(a("src/07/example1.txt")).toBe("4");
});

import b from "./b";
test("b examples", () => {
  expect(b("src/07/example1.txt")).toBe("32");
  expect(b("src/07/example2.txt")).toBe("126");
});
