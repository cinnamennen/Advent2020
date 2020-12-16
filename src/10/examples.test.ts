import a from "./a";

test("a examples", () => {
  expect(a("src/10/example1.txt")).toBe("35");
  expect(a("src/10/example2.txt")).toBe("220");
});

import b from "./b";

test("b examples", () => {
  expect(b("src/10/example1.txt")).toBe("8");
  expect(b("src/10/example2.txt")).toBe("19208");
});
