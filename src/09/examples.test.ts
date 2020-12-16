import a from "./a";

test("a examples", () => {
  expect(a("src/09/example1.txt", 5)).toBe("127");
});

import b from "./b";

test("b examples", () => {
  expect(b("src/09/example1.txt", 5)).toBe("62");
});
